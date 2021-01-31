import 'reflect-metadata';

import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validate } from 'class-validator';
import camelcase from 'lodash.camelcase';
import Papa from 'papaparse';
import { URL } from 'url';

enum Period {
  Daily = 'daily',
  Weekly = 'weekly',
}

class Query {
  @IsEnum(Period)
  @IsString()
  period?: Period;

  @IsString()
  region?: string;
}

async function fetchSpotifyCSV(
  region: string,
  period: Period,
): Promise<Record<string, string>[]> {
  const { data } = await axios.request({
    responseType: 'stream',
    url: `https://spotifycharts.com/regional/${region}/${period}/latest/download`,
  });
  return new Promise((resolve, reject) =>
    Papa.parse(data, {
      complete: record => {
        // skip the first line message "Note that these figures are generated using a formula that protects against any artificial inflation of chart positions."
        const realRecords = record.data.slice(1) as string[][];
        resolve(
          Papa.parse<Record<string, string>>(Papa.unparse(realRecords), {
            header: true,
          }).data,
        );
      },
      error: reject,
    }),
  );
}

function transformRecords(records: Record<string, string>[]) {
  return records
    .map(({ URL: trackUrl, ...record }) => ({
      ...record,
      URL: trackUrl,
      trackId: new URL(trackUrl).pathname.split('/')[2],
    }))
    .map(record =>
      Object.fromEntries(
        Object.entries(record).map(([key, value]) => [camelcase(key), value]),
      ),
    );
}

export const handler: Handler = async function fetchSpotifyChartsReport(
  event: APIGatewayProxyEvent,
) {
  // https://spotifycharts.com/regional/hk/daily/latest/download
  const { queryStringParameters } = event;
  const query = plainToClass(Query, queryStringParameters);
  const error = await validate(query);
  if (error.length > 0)
    return {
      body: JSON.stringify({ error }),
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 400,
    };
  return {
    body: JSON.stringify({
      data: {
        items: transformRecords(
          await fetchSpotifyCSV(query.region!, query.period!),
        ),
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
  };
};

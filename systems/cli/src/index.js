#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { commands } from './cmds/index.js';

yargs(hideBin(process.argv)).command(commands).demandCommand(1).parse();

import casual from 'casual';

function DeviceObjectFactory(attributes?: any) {
  return {
    id: '764c01a617a1d925c1345c0d2b6be6c48eddc386',
    is_active: true,
    is_private_session: false,
    is_restricted: false,
    name: 'David’s MacBook Pro',
    type: 'Computer',
    volume_percent: 50,
    ...attributes,
  };
}

casual.define('DeviceObject', DeviceObjectFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      DeviceObject: typeof DeviceObjectFactory;
    }
  }
}

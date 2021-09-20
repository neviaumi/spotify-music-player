import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DeviceObject } from '../../../../../../../../testHelper/seeders/DeviceObject';
import { AppThemeProvider } from '../../../../../../../contexts/Theme';
import { ConnectedDeviceItem } from '../ConnectedDeviceItem';

describe('ConnectedDeviceItem', () => {
  it('Clickable if selected device not current device', () => {
    const device = DeviceObject();
    const onClick = jest.fn();
    render(
      <AppThemeProvider>
        <ConnectedDeviceItem
          device={device}
          isCurrentDevice={false}
          key={device.id}
          onClick={onClick}
        />
        ,
      </AppThemeProvider>,
    );
    userEvent.click(
      screen.getByRole('button', {
        name: device.name,
      }),
    );
    expect(onClick).toHaveBeenCalledWith(device.id);
  });

  it('Click no effect if device is current device', () => {
    const device = DeviceObject();
    const onClick = jest.fn();
    render(
      <AppThemeProvider>
        <ConnectedDeviceItem
          device={device}
          isCurrentDevice={true}
          key={device.id}
          onClick={onClick}
        />
        ,
      </AppThemeProvider>,
    );
    userEvent.click(
      screen.getByRole('button', {
        name: device.name,
      }),
    );
    expect(onClick).not.toHaveBeenCalled();
  });
});

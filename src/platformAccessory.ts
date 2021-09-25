import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { TerneoHeatFloorV2Plugin } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class TerneoHeatFloorV2Accessory {
  private service: Service;

  constructor(
    private readonly platform: TerneoHeatFloorV2Plugin,
    private readonly accessory: PlatformAccessory,
  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');


    this.service = this.accessory.getService(this.platform.Service.Thermostat)
      || this.accessory.addService(this.platform.Service.Thermostat);

    // set the service name, this is what is displayed as the default name on the Home app
    // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below
  }


  async setOn(value: CharacteristicValue) {
    // implement your own code to turn your device on/off
    // this.exampleStates.On = value as boolean;

    this.platform.log.debug('Set Characteristic On ->', value);
  }


  async getOn(): Promise<CharacteristicValue> {
    // implement your own code to check if the device is on
    // const isOn = this.exampleStates.On;

    this.platform.log.debug('Get Characteristic On ->', true);

    return true;
  }
}

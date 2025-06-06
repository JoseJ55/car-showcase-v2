import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: {
    hex: '#FFFFFF',
    r: 255,
    g: 255,
    b: 255,
  },
  vehicleColor: '#BA1F33',
  colorPickerOpen: false,
  pastColors: [{
    hex: '#F8E71C',
    r: 248,
    g: 231,
    b: 28,
  }, {
    hex: '#D0021B',
    r: 208,
    g: 2,
    b: 27,
  }, {
    hex: '#50E3C2',
    r: 80,
    g: 227,
    b: 194,
  }, {
    hex: '#7ED321',
    r: 126,
    g: 211,
    b: 33,
  }, {
    hex: '#9013FE',
    r: 144,
    g: 19,
    b: 254,
  }],
  environmentOpen: false,
  currentEnvironment: 'vibe',
  brightEnvironment: false,
  currentVehicle: 'corvette_c7',
  vehicles: [
    'corvette_c7',
    'mclaren_p1',
    'porshe_taycan',
  ],
  newCar: false, // For car animation to animate car coming into view.
  moveCar: false, // For moving the current car off screen.
  carInView: false,
  showCar: true, // Render the vehicle
  loaded: { elements: false, models: false, all: false },
});

export default state;

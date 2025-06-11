import { proxy } from 'valtio';

interface RootState {
  intro: boolean;
  currentEnvironment: string;
  showCar: boolean;
  carInView: boolean;
  newCar: boolean;
  moveCar: boolean;
  currentVehicle: string;
  vehicles: string[];
}

const state = proxy<RootState>({
  intro: true,
  currentEnvironment: 'vibe',
  currentVehicle: 'corvette_c7',
  vehicles: [
    'corvette_c7',
    'mclaren_p1',
    'porshe_taycan',
  ],

  // newCar: false, // For car animation to animate car coming into view.
  // moveCar: false, // For moving the current car off screen.
  // carInView: false,
  showCar: true, // Render the vehicle

  carInView: false,
  newCar: false,
  moveCar: false,
});

export default state;

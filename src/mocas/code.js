const serial = 127603;
const moduleNum = 45;
const hourmeter_new = 34356642;
const timewindow_new = 234567;

let validation_code = 1;
let hourmeter_mix = 0;
let timewindow_mix = 0;

// Bitmask constants
const BITS = Array.from({ length: 32 }, (_, i) => 1 << i);

// Helper to extract bitmask
function bit(val, n) {
    return val & BITS[n];
}

// Serial bits
const serial_bits = Array.from({ length: 32 }, (_, i) => bit(serial, i));
// Module bits
const module_bits = Array.from({ length: 32 }, (_, i) => bit(moduleNum, i));

// Validation code calculation
validation_code += (serial_bits[4] >> 3);
validation_code += (serial_bits[3] >> 1);
validation_code += module_bits[3];
validation_code += (module_bits[1] << 3);
validation_code += (serial_bits[2] << 3);
validation_code += (serial_bits[1] << 5);
validation_code += (module_bits[2] << 5);
validation_code += (module_bits[0] << 8);
validation_code += (serial_bits[0] << 9);
validation_code += (serial_bits[5] << 5);
validation_code += (module_bits[0] << 11);
validation_code += (module_bits[0] << 12);
validation_code += BITS[13];

// Hourmeter bits
const hourmeter_bits = Array.from({ length: 32 }, (_, i) => bit(hourmeter_new, i));
hourmeter_mix += (hourmeter_bits[10] >> 9);
hourmeter_mix += (hourmeter_bits[9] >> 7);
hourmeter_mix += (hourmeter_bits[8] >> 5);
hourmeter_mix += (hourmeter_bits[7] >> 3);
hourmeter_mix += (hourmeter_bits[6] >> 1);
hourmeter_mix += (hourmeter_bits[5] << 1);
hourmeter_mix += (hourmeter_bits[4] << 3);
hourmeter_mix += (hourmeter_bits[3] << 5);
hourmeter_mix += (hourmeter_bits[2] << 7);
hourmeter_mix += (hourmeter_bits[1] << 9);

// Timewindow bits
const timewindow_bits = Array.from({ length: 32 }, (_, i) => bit(timewindow_new, i));
timewindow_mix += timewindow_bits[0];
timewindow_mix += (timewindow_bits[10] >> 9);
timewindow_mix += (timewindow_bits[9] >> 7);
timewindow_mix += (timewindow_bits[8] >> 5);
timewindow_mix += (timewindow_bits[7] >> 3);
timewindow_mix += (timewindow_bits[6] >> 1);
timewindow_mix += (timewindow_bits[5] << 1);
timewindow_mix += (timewindow_bits[4] << 3);
timewindow_mix += (timewindow_bits[3] << 5);
timewindow_mix += (timewindow_bits[2] << 7);
timewindow_mix += (timewindow_bits[1] << 9);
timewindow_mix += timewindow_bits[11] + timewindow_bits[12] + timewindow_bits[13] + timewindow_bits[14] + timewindow_bits[15];

// Output (Node.js or browser)
console.log(`${serial}\n${moduleNum}\n${validation_code}\n`);
console.log(`${hourmeter_new}\n${hourmeter_mix}\n`);
console.log(`${timewindow_new}\n${timewindow_mix}\n`);
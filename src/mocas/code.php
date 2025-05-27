<?php


$serial = 127603;
$module = 45;
$hourmeter_new = 34356642;
$timewindow_new = 234567;


$validation_code=1;
$hourmeter_mix = 0;
$timewindow_mix = 0;


define("b0",  0x1); // 2^0
define("b1",  0x2); // 2^1
define("b2",  0x4); // 2^2
define("b3",  0x8); // 2^3
define("b4",  0x10); // 2^4
define("b5",  0x20); // 2^5
define("b6",  0x40); // 2^6
define("b7",  0x80); // 2^7
define("b8",  0x100); // 2^8
define("b9",  0x200); // 2^9
define("b10", 0x400); // 2^10
define("b11", 0x800); // 2^11
define("b12", 0x1000); // 2^12
define("b13", 0x2000); // 2^13
define("b14", 0x4000); // 2^14
define("b15", 0x8000); // 2^15
define("b16", 0x10000); // 2^16
define("b17", 0x20000); // 2^17
define("b18", 0x40000); // 2^18
define("b19", 0x80000); // 2^19
define("f20", 0x100000); // 2^20
define("f21", 0x200000); // 2^21
define("f22", 0x400000); // 2^22
define("f23", 0x800000); // 2^23
define("f24", 0x1000000); // 2^24
define("f25", 0x2000000); // 2^25
define("f26", 0x4000000); // 2^26
define("f27", 0x8000000); // 2^27
define("f28", 0x10000000); // 2^28
define("f29", 0x20000000); // 2^29
define("f30", 0x40000000); // 2^30
define("f31", 0x80000000); // 2^31

$serial_b0 = $serial & b0;
$serial_b1 = $serial & b1;
$serial_b2 = $serial & b2;
$serial_b3 = $serial & b3;
$serial_b4 = $serial & b4;
$serial_b5 = $serial & b5;
$serial_b6 = $serial & b6;
$serial_b7 = $serial & b7;
$serial_b8 = $serial & b8;
$serial_b9 = $serial & b9;
$serial_b10 = $serial & b10;
$serial_b11 = $serial & b11;
$serial_b12 = $serial & b12;
$serial_b13 = $serial & b13;
$serial_b14 = $serial & b14;
$serial_b15 = $serial & b15;
$serial_b16 = $serial & b16;
$serial_b17 = $serial & b17;
$serial_b18 = $serial & b18;
$serial_b19 = $serial & b19;
$serial_b20 = $serial & b20;
$serial_b21 = $serial & b21;
$serial_b22 = $serial & b22;
$serial_b23 = $serial & b23;
$serial_b24 = $serial & b24;
$serial_b25 = $serial & b25;
$serial_b26 = $serial & b26;
$serial_b27 = $serial & b27;
$serial_b28 = $serial & b28;
$serial_b29 = $serial & b29;
$serial_b30 = $serial & b30;
$serial_b31 = $serial & b31;

$module_b0 = $module & b0;
$module_b1 = $module & b1;
$module_b2 = $module & b2;
$module_b3 = $module & b3;
$module_b4 = $module & b4;
$module_b5 = $module & b5;
$module_b6 = $module & b6;
$module_b7 = $module & b7;
$module_b8 = $module & b8;
$module_b9 = $module & b9;
$module_b10 = $module & b10;
$module_b11 = $module & b11;
$module_b12 = $module & b12;
$module_b13 = $module & b13;
$module_b14 = $module & b14;
$module_b15 = $module & b15;
$module_b16 = $module & b16;
$module_b17 = $module & b17;
$module_b18 = $module & b18;
$module_b19 = $module & b19;
$module_b20 = $module & b20;
$module_b21 = $module & b21;
$module_b22 = $module & b22;
$module_b23 = $module & b23;
$module_b24 = $module & b24;
$module_b25 = $module & b25;
$module_b26 = $module & b26;
$module_b27 = $module & b27;
$module_b28 = $module & b28;
$module_b29 = $module & b29;
$module_b30 = $module & b30;
$module_b31 = $module & b31;

$validation_code = $validation_code + ($serial_b4 >> 3);
$validation_code = $validation_code + ($serial_b3 >> 1);
$validation_code = $validation_code + $module_b3;
$validation_code = $validation_code + ($module_b1 << 3);
$validation_code = $validation_code + ($serial_b2 << 3);
$validation_code = $validation_code + ($serial_b1 << 5);
$validation_code = $validation_code + ($module_b2 << 5);
$validation_code = $validation_code + ($module_b0 << 8);
$validation_code = $validation_code + ($serial_b0 << 9);
$validation_code = $validation_code + ($serial_b5 << 5);
$validation_code = $validation_code + ($module_b0 << 11);
$validation_code = $validation_code + ($module_b0 << 12);
$validation_code = $validation_code + b13;

// Creating the hourmeter mixed value for the clp file

$hourmeter_new_b0 = $hourmeter_new & b0;
$hourmeter_new_b1 = $hourmeter_new & b1;
$hourmeter_new_b2 = $hourmeter_new & b2;
$hourmeter_new_b3 = $hourmeter_new & b3;
$hourmeter_new_b4 = $hourmeter_new & b4;
$hourmeter_new_b5 = $hourmeter_new & b5;
$hourmeter_new_b6 = $hourmeter_new & b6;
$hourmeter_new_b7 = $hourmeter_new & b7;
$hourmeter_new_b8 = $hourmeter_new & b8;
$hourmeter_new_b9 = $hourmeter_new & b9;
$hourmeter_new_b10 = $hourmeter_new & b10;
$hourmeter_new_b11 = $hourmeter_new & b11;
$hourmeter_new_b12 = $hourmeter_new & b12;
$hourmeter_new_b13 = $hourmeter_new & b13;
$hourmeter_new_b14 = $hourmeter_new & b14;
$hourmeter_new_b15 = $hourmeter_new & b15;
$hourmeter_new_b16 = $hourmeter_new & b16;
$hourmeter_new_b17 = $hourmeter_new & b17;
$hourmeter_new_b18 = $hourmeter_new & b18;
$hourmeter_new_b19 = $hourmeter_new & b19;
$hourmeter_new_b20 = $hourmeter_new & b20;
$hourmeter_new_b21 = $hourmeter_new & b21;
$hourmeter_new_b22 = $hourmeter_new & b22;
$hourmeter_new_b23 = $hourmeter_new & b23;
$hourmeter_new_b24 = $hourmeter_new & b24;
$hourmeter_new_b25 = $hourmeter_new & b25;
$hourmeter_new_b26 = $hourmeter_new & b26;
$hourmeter_new_b27 = $hourmeter_new & b27;
$hourmeter_new_b28 = $hourmeter_new & b28;
$hourmeter_new_b29 = $hourmeter_new & b29;
$hourmeter_new_b30 = $hourmeter_new & b30;
$hourmeter_new_b31 = $hourmeter_new & b31;


$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b10 >> 9);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b9 >> 7);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b8 >> 5);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b7 >> 3);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b6 >> 1);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b5 << 1);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b4 << 3);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b3 << 5);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b2 << 7);
$hourmeter_mix = $hourmeter_mix + ($hourmeter_new_b1 << 9);



// Creating the time window mixed value for the clp file

$timewindow_new_b0 = $timewindow_new & b0;
$timewindow_new_b1 = $timewindow_new & b1;
$timewindow_new_b2 = $timewindow_new & b2;
$timewindow_new_b3 = $timewindow_new & b3;
$timewindow_new_b4 = $timewindow_new & b4;
$timewindow_new_b5 = $timewindow_new & b5;
$timewindow_new_b6 = $timewindow_new & b6;
$timewindow_new_b7 = $timewindow_new & b7;
$timewindow_new_b8 = $timewindow_new & b8;
$timewindow_new_b9 = $timewindow_new & b9;
$timewindow_new_b10 = $timewindow_new & b10;
$timewindow_new_b11 = $timewindow_new & b11;
$timewindow_new_b12 = $timewindow_new & b12;
$timewindow_new_b13 = $timewindow_new & b13;
$timewindow_new_b14 = $timewindow_new & b14;
$timewindow_new_b15 = $timewindow_new & b15;
$timewindow_new_b16 = $timewindow_new & b16;
$timewindow_new_b17 = $timewindow_new & b17;
$timewindow_new_b18 = $timewindow_new & b18;
$timewindow_new_b19 = $timewindow_new & b19;
$timewindow_new_b20 = $timewindow_new & b20;
$timewindow_new_b21 = $timewindow_new & b21;
$timewindow_new_b22 = $timewindow_new & b22;
$timewindow_new_b23 = $timewindow_new & b23;
$timewindow_new_b24 = $timewindow_new & b24;
$timewindow_new_b25 = $timewindow_new & b25;
$timewindow_new_b26 = $timewindow_new & b26;
$timewindow_new_b27 = $timewindow_new & b27;
$timewindow_new_b28 = $timewindow_new & b28;
$timewindow_new_b29 = $timewindow_new & b29;
$timewindow_new_b30 = $timewindow_new & b30;
$timewindow_new_b31 = $timewindow_new & b31;


$timewindow_mix = $timewindow_mix + $timewindow_new_b0;
$timewindow_mix = $timewindow_mix + ($timewindow_new_b10 >> 9);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b9 >> 7);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b8 >> 5);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b7 >> 3);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b6 >> 1);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b5 << 1);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b4 << 3);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b3 << 5);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b2 << 7);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b1 << 9);
$timewindow_mix = $timewindow_mix + $timewindow_new_b11 + $timewindow_new_b12 + $timewindow_new_b13 + $timewindow_new_b14 + $timewindow_new_b15;



echo($serial . "<br>". $module . "<br>". $validation_code . "<br>");

echo($hourmeter_new . "<br>". $hourmeter_mix . "<br>");
echo($timewindow_new . "<br>". $timewindow_mix . "<br>");


//$x=17;
//$y= $x & b4;
//echo($x . "<br>". b4 . "<br>". $y . "<br>");


?>
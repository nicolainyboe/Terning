let oldValTemp = 0;

function threshold(val, tolerance) {
    if (arguments.length == 1) {
        tolerance = 0;
    }
    if (Math.abs(val - oldValTemp) > tolerance) {
        oldValTemp = val;
        return true;
    } else {
        return false;
    }
}
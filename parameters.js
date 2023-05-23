document.addEventListener("DOMContentLoaded", () => {

    // CANVAS ATTRIBUTES //
    let backgroundRed = 0;
    let backgroundGreen = 0;
    let backgroundBlue = 0;

    let colorRed = 0;
    let colorGreen = 0;
    let colorBlue = 0;

    let xStartCoord = 0;
    let xEndCoord = 0;
    let yStartCoord = 0;
    let yEndCoord = 0;

    let count = 0;
    let index = 0;

    let xStartOffset = 0;
    let xEndOffset = 0;
    let yStartOffset = 0;
    let yEndOffset = 0;

    let xStartCoef = 0;
    let xEndCoef = 0;
    let yStartCoef = 0;
    let yEndCoef = 0;


    // CANVAS CONTROL ELEMENTS //
    // Background color sliders
    const BACKGROUND_RED_SLIDER = document.getElementById("r-background-range");
    const BACKGROUND_GREEN_SLIDER = document.getElementById("g-background-range");
    const BACKGROUND_BLUE_SLIDER = document.getElementById("b-background-range");
    const BACKGROUND_SLIDERS = [BACKGROUND_RED_SLIDER, BACKGROUND_BLUE_SLIDER, BACKGROUND_GREEN_SLIDER];

    // Background color numbers
    const BACKGROUND_RED_NUMBER = document.getElementById("r-background-number");
    const BACKGROUND_GREEN_NUMBER = document.getElementById("g-background-number");
    const BACKGROUND_BLUE_NUMBER = document.getElementById("b-background-number");
    const BACKGROUND_NUMBERS = [BACKGROUND_RED_NUMBER, BACKGROUND_BLUE_NUMBER, BACKGROUND_GREEN_NUMBER];

    // Color sliders
    const RED_SLIDER = document.getElementById("r-color-range");
    const GREEN_SLIDER = document.getElementById("g-color-range");
    const BLUE_SLIDER = document.getElementById("b-color-range");
    const COLOR_SLIDERS = [RED_SLIDER, BLUE_SLIDER, GREEN_SLIDER];

    // Color numbers
    const RED_NUMBER = document.getElementById("r-color-number");
    const GREEN_NUMBER = document.getElementById("g-color-number");
    const BLUE_NUMBER = document.getElementById("b-color-number");
    const COLOR_NUMBERS = [RED_NUMBER, BLUE_NUMBER, GREEN_NUMBER];

    // Coordinates
    const X_START_SLIDER = document.getElementById("x-start-range");
    const Y_START_SLIDER = document.getElementById("y-start-range");
    const X_END_SLIDER = document.getElementById("x-end-range");
    const Y_END_SLIDER = document.getElementById("y-end-range");
    const COORD_SLIDERS = [X_START_SLIDER, Y_START_SLIDER, X_END_SLIDER, Y_END_SLIDER];

    const X_START_NUMBER = document.getElementById("x-start-number");
    const Y_START_NUMBER = document.getElementById("y-start-number");
    const X_END_NUMBER = document.getElementById("x-end-number");
    const Y_END_NUMBER = document.getElementById("y-end-number");
    const COORD_NUMBERS = [X_START_NUMBER, Y_START_NUMBER, X_END_NUMBER, Y_END_NUMBER];

    // Size parameters
    const WIDTH_SLIDER = document.getElementById("width-range");
    const WIDTH_NUMBER = document.getElementById("width-number");

    // Iterations
    const COUNT_SLIDER = document.getElementById("i-count-range");
    const COUNT_NUMBER = document.getElementById("i-count-number");

    const INDEX_SLIDER = document.getElementById("i-index-range");
    const INDEX_NUMBER = document.getElementById("i-index-number");

    // Iteration offset
    const X_OFFSET_START_SLIDER = document.getElementById("x-offset-start-range");
    const Y_OFFSET_START_SLIDER = document.getElementById("y-offset-start-range");
    const X_OFFSET_END_SLIDER = document.getElementById("x-offset-end-range");
    const Y_OFFSET_END_SLIDER = document.getElementById("y-offset-end-range");
    const OFFSET_SLIDERS = [X_OFFSET_START_SLIDER, Y_OFFSET_START_SLIDER, X_OFFSET_END_SLIDER, Y_OFFSET_END_SLIDER];

    const X_OFFSET_START_NUMBER = document.getElementById("x-offset-start-number");
    const Y_OFFSET_START_NUMBER = document.getElementById("y-offset-start-number");
    const X_OFFSET_END_NUMBER = document.getElementById("x-offset-end-number");
    const Y_OFFSET_END_NUMBER = document.getElementById("y-offset-end-number");
    const OFFSET_NUMBERS = [X_OFFSET_START_NUMBER, Y_OFFSET_START_NUMBER, X_OFFSET_END_NUMBER, Y_OFFSET_END_NUMBER];

    // Iteration exponents
    const X_OFFSET_START_EXPONENT = document.getElementById("x-offset-start-exponent");
    const Y_OFFSET_START_EXPONENT = document.getElementById("y-offset-start-exponent");
    const X_OFFSET_END_EXPONENT = document.getElementById("x-offset-end-exponent");
    const Y_OFFSET_END_EXPONENT = document.getElementById("y-offset-end-exponent");
    const EXPONENT_NUMBERS = [X_OFFSET_START_EXPONENT, Y_OFFSET_START_EXPONENT, X_OFFSET_END_EXPONENT, Y_OFFSET_END_EXPONENT];

    // VALUE SWEEP //
    let sweepInterval;
    const SWEEP_BTN = document.getElementById("sweep-btn");
    const SWEEP_TIME = document.getElementById("sweep-time");
    // Count sweep
    const COUNT_SWEEP_FROM = document.getElementById("sweep-count-from");
    const COUNT_SWEEP_TO = document.getElementById("sweep-count-to");

    // Color sweep
    const COLOR_R_SWEEP_FROM = document.getElementById("sweep-color-r-from");
    const COLOR_R_SWEEP_TO = document.getElementById("sweep-color-r-to");
    const COLOR_G_SWEEP_FROM = document.getElementById("sweep-color-g-from");
    const COLOR_G_SWEEP_TO = document.getElementById("sweep-color-g-to");
    const COLOR_B_SWEEP_FROM = document.getElementById("sweep-color-b-from");
    const COLOR_B_SWEEP_TO = document.getElementById("sweep-color-b-to");

    // CANVAS //
    const WIDTH_RES = document.getElementById("width-res");
    const HEIGHT_RES = document.getElementById("height-res");
    const CANVAS = document.getElementById("drawing-canvas");
    let ctx = CANVAS.getContext('2d');

    // Type selection
    const FUNCTION_TYPE = document.querySelectorAll('input[name="function_type"]');
    let selectedType = "linear";

    // Update all number values and draw canvas
    UpdateCanvasResolution();
    UpdateAllNumberValues();
    UpdateCanvas();

    // Draws canvas of the selected type
    FUNCTION_TYPE.forEach(type => {
        type.addEventListener("input", () => {
            for (let type of FUNCTION_TYPE) {
                if (type.checked) {
                    selectedType = type.value;
                    UpdateCanvas();
                    break;
                }
            }
        });
    });

    // SWEEP CONTROLS //
    // Sweep all
    SWEEP_BTN.addEventListener("click", () => {
        if(sweepInterval !== undefined) {
            clearInterval(sweepInterval);
            sweepInterval = undefined;
            SWEEP_BTN.innerHTML = "Sweep";
            COUNT_NUMBER.disabled = false;
            COUNT_SLIDER.disabled = false;

            RED_SLIDER.disabled = false;
            GREEN_SLIDER.disabled = false;
            BLUE_SLIDER.disabled = false;

            RED_NUMBER.disabled = false;
            GREEN_NUMBER.disabled = false;
            BLUE_NUMBER.disabled = false;

        } else {
            ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
            SWEEP_BTN.innerHTML = "Stop";
            COUNT_NUMBER.disabled = true;
            COUNT_SLIDER.disabled = true;

            RED_SLIDER.disabled = true;
            GREEN_SLIDER.disabled = true;
            BLUE_SLIDER.disabled = true;

            RED_NUMBER.disabled = true;
            GREEN_NUMBER.disabled = true;
            BLUE_NUMBER.disabled = true;

            RED_SLIDER.value = parseFloat(COLOR_R_SWEEP_FROM.value);
            GREEN_SLIDER.value = parseFloat(COLOR_G_SWEEP_FROM.value);
            BLUE_SLIDER.value = parseFloat(COLOR_B_SWEEP_FROM.value);

            RED_NUMBER.value = parseFloat(COLOR_R_SWEEP_FROM.value);
            GREEN_NUMBER.value = parseFloat(COLOR_G_SWEEP_FROM.value);
            BLUE_NUMBER.value = parseFloat(COLOR_B_SWEEP_FROM.value);

            let totalSteps = parseFloat(COUNT_SWEEP_TO.value) - parseFloat(COUNT_SWEEP_FROM.value);

            let redStep = (parseFloat(COLOR_R_SWEEP_TO.value) - parseFloat(COLOR_R_SWEEP_FROM.value)) / totalSteps;
            let greenStep = (parseFloat(COLOR_G_SWEEP_TO.value) - parseFloat(COLOR_G_SWEEP_FROM.value)) / totalSteps;
            let blueStep = (parseFloat(COLOR_B_SWEEP_TO.value) - parseFloat(COLOR_B_SWEEP_FROM.value)) / totalSteps;

            let counter = COUNT_SWEEP_FROM.value;

            sweepInterval = setInterval(() => {
                UpdateCanvasExperimental(counter);

                // Calculate how much should the color change every iteration based on iteration count
                // Set base values for stroke color
                RED_SLIDER.value = parseFloat(RED_NUMBER.value) + redStep;
                GREEN_SLIDER.value = parseFloat(GREEN_NUMBER.value) + greenStep;
                BLUE_SLIDER.value = parseFloat(BLUE_NUMBER.value) + blueStep;

                RED_NUMBER.value = parseFloat(RED_NUMBER.value) + redStep;
                GREEN_NUMBER.value = parseFloat(GREEN_NUMBER.value) + greenStep;
                BLUE_NUMBER.value = parseFloat(BLUE_NUMBER.value) + blueStep;

                COUNT_NUMBER.value = counter;
                COUNT_SLIDER.value = counter;
                counter++;
                if (counter == COUNT_SWEEP_TO.value) {
                    clearInterval(sweepInterval);
                    sweepInterval = undefined;
                    SWEEP_BTN.innerHTML = "Sweep";
                    COUNT_NUMBER.disabled = false;
                    COUNT_SLIDER.disabled = false;

                    RED_SLIDER.disabled = false;
                    GREEN_SLIDER.disabled = false;
                    BLUE_SLIDER.disabled = false;

                    RED_NUMBER.disabled = false;
                    GREEN_NUMBER.disabled = false;
                    BLUE_NUMBER.disabled = false;
                }
            }, SWEEP_TIME.value);
        }
    });
    
    // SLIDER AND NUMBER CONTROLS //
    // Canvas resolution
    WIDTH_RES.addEventListener("input", () => {
        UpdateCanvasResolution();
    });
    HEIGHT_RES.addEventListener("input", () => {
        UpdateCanvasResolution();
    });

    // Background color sliders
    BACKGROUND_SLIDERS.forEach(slider => {
        slider.addEventListener("input", () => {
            BACKGROUND_RED_NUMBER.value = BACKGROUND_RED_SLIDER.value;
            BACKGROUND_BLUE_NUMBER.value = BACKGROUND_BLUE_SLIDER.value;
            BACKGROUND_GREEN_NUMBER.value = BACKGROUND_GREEN_SLIDER.value;
            UpdateCanvas();
        });
    });

    // Background color numbers
    BACKGROUND_NUMBERS.forEach(number => {
        number.addEventListener("input", () => {
            BACKGROUND_RED_SLIDER.value = BACKGROUND_RED_NUMBER.value;
            BACKGROUND_BLUE_SLIDER.value = BACKGROUND_BLUE_NUMBER.value;
            BACKGROUND_GREEN_SLIDER.value = BACKGROUND_GREEN_NUMBER.value;
            UpdateCanvas();
        });
    });

    // Stroke color sliders
    COLOR_SLIDERS.forEach(slider => {
        slider.addEventListener("input", () => {
            RED_NUMBER.value = RED_SLIDER.value;
            BLUE_NUMBER.value = BLUE_SLIDER.value;
            GREEN_NUMBER.value = GREEN_SLIDER.value;
            UpdateCanvas();
        });
    });

    // Stroke color numbers
    COLOR_NUMBERS.forEach(number => {
        number.addEventListener("input", () => {
            RED_SLIDER.value = RED_NUMBER.value;
            BLUE_SLIDER.value = BLUE_NUMBER.value;
            GREEN_SLIDER.value = GREEN_NUMBER.value;
            UpdateCanvas();
        });
    });

    // Stroke coordinate sliders
    COORD_SLIDERS.forEach(slider => {
        slider.addEventListener("input", () => {
            X_START_NUMBER.value = X_START_SLIDER.value;
            Y_START_NUMBER.value = Y_START_SLIDER.value;
            X_END_NUMBER.value = X_END_SLIDER.value;
            Y_END_NUMBER.value = Y_END_SLIDER.value;
            UpdateCanvas();
        });
    });

    // Stroke coordinate numbers
    COORD_NUMBERS.forEach(number => {
        number.addEventListener("input", () => {
            X_START_SLIDER.value = X_START_NUMBER.value;
            Y_START_SLIDER.value = Y_START_NUMBER.value;
            X_END_SLIDER.value = X_END_NUMBER.value;
            Y_END_SLIDER.value = Y_END_NUMBER.value;
            UpdateCanvas();
        });
    });

    // Stroke width slider
    WIDTH_SLIDER.addEventListener("input", () => {
        WIDTH_NUMBER.value = WIDTH_SLIDER.value;
        UpdateCanvas();
    });

    // Stroke width number
    WIDTH_NUMBER.addEventListener("input", () => {
        WIDTH_SLIDER.value = WIDTH_NUMBER.value;
        UpdateCanvas();
    });

    // Stroke count slider
    COUNT_SLIDER.addEventListener("input", () => {
        COUNT_NUMBER.value = COUNT_SLIDER.value;
        UpdateIndexValue();
        UpdateCanvas();
    });

    // Stroke count number
    COUNT_NUMBER.addEventListener("input", () => {
        COUNT_SLIDER.value = COUNT_NUMBER.value;
        UpdateIndexValue();
        UpdateCanvas();
    });

    // Stroke index slider
    INDEX_SLIDER.addEventListener("input", () => {
        INDEX_NUMBER.value = INDEX_SLIDER.value;
        UpdateCanvas();
    });

    // Stroke index number
    INDEX_NUMBER.addEventListener("input", () => {
        INDEX_SLIDER.value = INDEX_NUMBER.value;
        UpdateCanvas();
    });

    // Stroke offset sliders
    OFFSET_SLIDERS.forEach(slider => {
        slider.addEventListener("input", () => {
            X_OFFSET_START_NUMBER.value = X_OFFSET_START_SLIDER.value;
            Y_OFFSET_START_NUMBER.value = Y_OFFSET_START_SLIDER.value;
            X_OFFSET_END_NUMBER.value = X_OFFSET_END_SLIDER.value;
            Y_OFFSET_END_NUMBER.value = Y_OFFSET_END_SLIDER.value;
            UpdateCanvas();
        });
    });

    // Stroke offset numbers
    OFFSET_NUMBERS.forEach(number => {
        number.addEventListener("input", () => {
            X_OFFSET_START_SLIDER.value = X_OFFSET_START_NUMBER.value;
            Y_OFFSET_START_SLIDER.value = Y_OFFSET_START_NUMBER.value;
            X_OFFSET_END_SLIDER.value = X_OFFSET_END_NUMBER.value;
            Y_OFFSET_END_SLIDER.value = Y_OFFSET_END_NUMBER.value;
            UpdateCanvas();
        });
    });

    // Stroke offset exponent number
    EXPONENT_NUMBERS.forEach(number => {
       number.addEventListener("input", () => {
           UpdateCanvas();
       });
    });

    // Updates canvas resolution
    function UpdateCanvasResolution() {
        CANVAS.width = WIDTH_RES.value;
        CANVAS.height = HEIGHT_RES.value;
        X_START_NUMBER.max = WIDTH_RES.value;
        Y_START_NUMBER.max = HEIGHT_RES.value;
        X_START_SLIDER.max = WIDTH_RES.value;
        Y_START_SLIDER.max = HEIGHT_RES.value;

        X_END_NUMBER.max = WIDTH_RES.value;
        Y_END_NUMBER.max = HEIGHT_RES.value;
        X_END_SLIDER.max = WIDTH_RES.value;
        Y_END_SLIDER.max = HEIGHT_RES.value;

        if (parseFloat(X_END_NUMBER.value) > parseFloat(WIDTH_RES.value)) X_END_NUMBER.value = WIDTH_RES.value;
        if (parseFloat(Y_END_NUMBER.value) > parseFloat(HEIGHT_RES.value)) Y_END_NUMBER.value = HEIGHT_RES.value;

        X_END_SLIDER.value = X_END_NUMBER.value;
        Y_END_SLIDER.value = Y_END_NUMBER.value;
        
        UpdateCanvas();
    }

    // Updates all canvas values
    function UpdateValues() {
        backgroundRed = BACKGROUND_RED_SLIDER.value;
        backgroundGreen = BACKGROUND_GREEN_SLIDER.value;
        backgroundBlue = BACKGROUND_BLUE_SLIDER.value;

        colorRed = RED_SLIDER.value;
        colorGreen = GREEN_SLIDER.value;
        colorBlue = BLUE_SLIDER.value;

        xStartCoord = parseFloat(X_START_NUMBER.value);
        xEndCoord = parseFloat(X_END_NUMBER.value);
        yStartCoord = parseFloat(Y_START_NUMBER.value);
        yEndCoord = parseFloat(Y_END_NUMBER.value);

        width = WIDTH_NUMBER.value;

        count = parseFloat(COUNT_NUMBER.value);
        index = parseFloat(INDEX_NUMBER.value);

        xStartOffset = parseFloat(X_OFFSET_START_NUMBER.value);
        xEndOffset = parseFloat(X_OFFSET_END_NUMBER.value);
        yStartOffset = parseFloat(Y_OFFSET_START_NUMBER.value);
        yEndOffset = parseFloat(Y_OFFSET_END_NUMBER.value);

        xStartCoef = parseFloat(X_OFFSET_START_EXPONENT.value);
        xEndCoef = parseFloat(X_OFFSET_END_EXPONENT.value);
        yStartCoef = parseFloat(Y_OFFSET_START_EXPONENT.value);
        yEndCoef = parseFloat(Y_OFFSET_END_EXPONENT.value);
    }

    // Updates canvas
    function UpdateCanvas(clear = true) {
        UpdateValues();
        CANVAS.style.backgroundColor = "rgb("+backgroundRed+", "+backgroundGreen+", "+backgroundBlue+")";
        ctx.strokeStyle = "rgb("+colorRed+", "+colorGreen+", "+colorBlue+")";
        ctx.lineWidth = WIDTH_NUMBER.value;
        if(clear) {
            ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
        }

        if(selectedType === "linear") {
            for (let i = index; i < count + index; i++) {
                ctx.beginPath();
                ctx.moveTo(xStartCoord + xStartOffset * i ** xStartCoef, yStartCoord + yStartOffset * i ** yStartCoef);
                ctx.lineTo(xEndCoord + xEndOffset * i ** xEndCoef, yEndCoord + yEndOffset * i ** yEndCoef);
                ctx.stroke();
            }
        } else if (selectedType === "sin") {
            for (let i = INDEX_NUMBER.value; i < parseFloat(COUNT_NUMBER.value) + parseFloat(INDEX_NUMBER.value); i++) {
                ctx.beginPath();
                ctx.moveTo(xStartCoord + Math.sin(xStartOffset * i) * xStartCoef, yStartCoord + Math.sin(yStartOffset * i) * yStartCoef);
                ctx.lineTo(xEndCoord + Math.sin(xEndOffset * i) * xEndCoef, yEndCoord + Math.sin(yEndOffset * i) * yEndCoef);
                ctx.stroke();
            }
        }
        else if (selectedType === "tan") {
            for (let i = INDEX_NUMBER.value; i < parseFloat(COUNT_NUMBER.value) + parseFloat(INDEX_NUMBER.value); i++) {
                ctx.beginPath();
                ctx.moveTo(xStartCoord + Math.tan(xStartOffset * i) * xStartCoef, yStartCoord + Math.tan(yStartOffset * i) * yStartCoef);
                ctx.lineTo(xEndCoord + Math.tan(xEndOffset * i) * xEndCoef, yEndCoord + Math.tan(yEndOffset * i) * yEndCoef);
                ctx.stroke();
            }
        }
        else if (selectedType === "cos") {
            for (let i = INDEX_NUMBER.value; i < parseFloat(COUNT_NUMBER.value) + parseFloat(INDEX_NUMBER.value); i++) {
                ctx.beginPath();
                ctx.moveTo(xStartCoord + Math.cos(xStartOffset * i) * xStartCoef, yStartCoord + Math.cos(yStartOffset * i) * yStartCoef);
                ctx.lineTo(xEndCoord + Math.cos(xEndOffset * i) * xEndCoef, yEndCoord + Math.cos(yEndOffset * i) * yEndCoef);
                ctx.stroke();
            }
        }
    }

    function UpdateCanvasExperimental(counter) {
        UpdateValues();
        CANVAS.style.backgroundColor = "rgb("+backgroundRed+", "+backgroundGreen+", "+backgroundBlue+")";
        ctx.strokeStyle = "rgb("+colorRed+", "+colorGreen+", "+colorBlue+")";
        ctx.lineWidth = WIDTH_NUMBER.value;

        if(selectedType === "linear") {
            ctx.beginPath();
            ctx.moveTo(xStartCoord + xStartOffset * counter ** xStartCoef, yStartCoord + yStartOffset * counter ** yStartCoef);
            ctx.lineTo(xEndCoord + xEndOffset * counter ** xEndCoef, yEndCoord + yEndOffset * counter ** yEndCoef);
            ctx.stroke();
        } else if (selectedType === "sin") {
            ctx.beginPath();
            ctx.moveTo(xStartCoord + Math.sin(xStartOffset * counter) * xStartCoef, yStartCoord + Math.sin(yStartOffset * counter) * yStartCoef);
            ctx.lineTo(xEndCoord + Math.sin(xEndOffset * counter) * xEndCoef, yEndCoord + Math.sin(yEndOffset * counter) * yEndCoef);
            ctx.stroke();
        }
        else if (selectedType === "tan") {
            ctx.beginPath();
            ctx.moveTo(xStartCoord + Math.tan(xStartOffset * counter) * xStartCoef, yStartCoord + Math.tan(yStartOffset * counter) * yStartCoef);
            ctx.lineTo(xEndCoord + Math.tan(xEndOffset * counter) * xEndCoef, yEndCoord + Math.tan(yEndOffset * counter) * yEndCoef);
            ctx.stroke();
        }
        else if (selectedType === "cos") {
            ctx.beginPath();
            ctx.moveTo(xStartCoord + Math.cos(xStartOffset * counter) * xStartCoef, yStartCoord + Math.cos(yStartOffset * counter) * yStartCoef);
            ctx.lineTo(xEndCoord + Math.cos(xEndOffset * counter) * xEndCoef, yEndCoord + Math.cos(yEndOffset * counter) * yEndCoef);
            ctx.stroke();
        }
    }

    // Updates all numeric values of canvas controls
    function UpdateAllNumberValues() {
        // Background color values
        BACKGROUND_RED_NUMBER.value = BACKGROUND_RED_SLIDER.value;
        BACKGROUND_BLUE_NUMBER.value = BACKGROUND_BLUE_SLIDER.value;
        BACKGROUND_GREEN_NUMBER.value = BACKGROUND_GREEN_SLIDER.value;

        // Color values
        RED_NUMBER.value = RED_SLIDER.value;
        BLUE_NUMBER.value = BLUE_SLIDER.value;
        GREEN_NUMBER.value = GREEN_SLIDER.value;

        // Coordinate values
        X_START_NUMBER.value = X_START_SLIDER.value;
        Y_START_NUMBER.value = Y_START_SLIDER.value;
        X_END_NUMBER.value = X_END_SLIDER.value;
        Y_END_NUMBER.value = Y_END_SLIDER.value;

        // Width value
        WIDTH_NUMBER.value = WIDTH_SLIDER.value;

        // Iteration count value
        COUNT_NUMBER.value = COUNT_SLIDER.value;

        // Iteration index value
        INDEX_NUMBER.value = INDEX_SLIDER.value;
        UpdateIndexValue();

        // Iteration offset value
        X_OFFSET_START_NUMBER.value = X_OFFSET_START_SLIDER.value;
        Y_OFFSET_START_NUMBER.value = Y_OFFSET_START_SLIDER.value;
        X_OFFSET_END_NUMBER.value = X_OFFSET_END_SLIDER.value;
        Y_OFFSET_END_NUMBER.value = Y_OFFSET_END_SLIDER.value;

    }

    // Updates index value based on iteration count
    function UpdateIndexValue() {
        let indexMin = COUNT_NUMBER.value * -1 + 1;

        INDEX_NUMBER.min = indexMin;
        INDEX_SLIDER.min = indexMin;
    }
});
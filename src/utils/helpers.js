/**
 * Generates a cryptographically secure random number between 0 and max-1
 * @param {number} max - The upper bound (exclusive)
 * @returns {number} A random number between 0 and max-1
 */
export function getSecureRandomNumber(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

/**
 * Performs a Fisher-Yates shuffle on an array
 * @template T
 * @param {T[]} array - The array to shuffle
 * @returns {T[]} The shuffled array
 */
export function fisherYatesShuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = getSecureRandomNumber(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Performs a riffle shuffle on an array (similar to how a dealer shuffles cards)
 * @template T
 * @param {T[]} array - The array to shuffle
 * @param {number} [bias=0.5] - Bias for the shuffle (0.5 means equal chance)
 * @returns {T[]} The shuffled array
 */
export function riffleShuffle(array, bias = 0.5) {
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    const shuffled = [];

    while (left.length && right.length) {
        if (Math.random() < bias) {
            shuffled.push(left.shift());
        } else {
            shuffled.push(right.shift());
        }
    }

    return shuffled.concat(left, right);
}

/**
 * Performs multiple rounds of riffle shuffles
 * @template T
 * @param {T[]} array - The array to shuffle
 * @param {number} rounds - Number of shuffle rounds
 * @returns {T[]} The shuffled array
 */
export function multipleRiffleShuffles(array, rounds) {
    let result = [...array];
    for (let i = 0; i < rounds; i++) {
        result = riffleShuffle(result);
    }
    return result;
}

/**
 * Performs a thorough shuffle using a combination of Fisher-Yates and riffle shuffles
 * @template T
 * @param {T[]} array - The array to shuffle
 * @param {number} [riffleRounds=7] - Number of riffle shuffle rounds
 * @returns {T[]} The thoroughly shuffled array
 */
export function thoroughShuffle(array, riffleRounds = 7) {
    // Initial Fisher-Yates shuffle
    let result = fisherYatesShuffle(array);
    
    // Multiple riffle shuffles
    result = multipleRiffleShuffles(result, riffleRounds);
    
    // Final Fisher-Yates shuffle
    return fisherYatesShuffle(result);
}

/**
 * Checks if a number is within a range (inclusive)
 * @param {number} value - The value to check
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {boolean} Whether the value is within range
 */
export function isInRange(value, min, max) {
    return value >= min && value <= max;
}

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - The number of milliseconds to delay
 * @returns {Promise<void>} A promise that resolves after the delay
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a deep clone of an array or object
 * @template T
 * @param {T} obj - The object to clone
 * @returns {T} A deep clone of the object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
} 
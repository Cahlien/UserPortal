/**
 * This class represents a currency value, such as a balance or
 * transaction amount.  It has three properties: a boolean flag
 * representing whether the amount is negative, an integer for
 * the dollar value, and an integer for the cents value.  All
 * numerical values are stored as their absolute values and the
 * positive or negative aspect is represented solely by the
 * isNegative boolean flag.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 */
export class CurrencyValue{
    /**
     * The parameterized constructor for the CurrencyValue class
     * takes three arguments: a boolean for whether the value is
     * negative, an integer for the number of dollars, and another
     * integer for the number of cents.
     *
     * @param isNegative boolean answers if the value is negative
     * @param dollars integer the number of dollars
     * @param cents integer the number of cents
     */
    constructor(isNegative, dollars, cents) {
        this.negative = isNegative;
        this.dollars = Math.abs(parseInt(dollars));
        this.cents = Math.abs(parseInt(cents));
    }

    /**
     * Getter for isNegative flag.
     *
     * @returns {*} boolean whether the value is negative
     */
    get isNegative() {
        return this.negative;
    }

    /**
     * Setter for the isNegative flag.
     *
     * @param value boolean whether the value is negative
     */
    set isNegative(value) {
        this.negative = value;
    }

    /**
     * Getter for dollar value.
     *
     * @returns {number} integer the dollar value
     */
    get getDollars() {
        return this.dollars;
    }

    /**
     * Setter for dollar value.
     *
     * @param value integer the dollar value
     */
    set setDollars(value) {
        this.dollars = Math.abs(parseInt(value));
    }

    /**
     * Getter for cents value.
     *
     * @returns {number} integer the cents value
     */
    get getCents() {
        return this.cents;
    }

    /**
     * Setter for cents value.
     *
     * @param value integer the cents value
     */
    set setCents(value) {
        this.cents = Math.abs(parseInt(value));
    }

    /**
     * This method compares this object to another object and
     * returns a -1 if this object represents a smaller value,
     * 0 if it represents the same value, and 1 if it represents
     * a larger value than the other CurrencyValue object.
     *
     * @param other CurrencyValue the currency value to compare this value to
     * @returns {number} integer -1 for less than, 0 for equal to, 1 for greater than
     */
    compareTo(other){
        let returnValue = 0;

        if (this.isNegative === other.isNegative) {
            if (this.dollars !== other.dollars) {
                returnValue = this.dollars > other.dollars ? 1 : -1;
            } else {
                returnValue = this.cents > other.cents ? 1 : -1;
            }

            if (this.isNegative) {
                returnValue *= -1;
            }
        } else {
            returnValue = this.isNegative ? -1 : 1;
        }

        return returnValue;
    }

    /**
     * This method returns a string representation of the currency
     * value object using the USD currency notation conventions.
     */
    toString() {
        return (this.isNegative ? '-$' : '$') + this.dollars + '.' + (this.cents < 10 ? '0' : '') + this.cents;
    }

    /**
     * This method attempts to parse a number object with non-
     * integer values into a CurrencyValue object storing dollars
     * and cents as integer values, which are more accurate for
     * the purpose of calculations.  Although care is taken to
     * attempt to create a new CurrencyValue object safely, the
     * burden is on the user of this method to ensure that the
     * resulting value is the intended value and does not contain
     * any distortions from rounding errors or the inherent value
     * approximation that is a floating point representation.
     *
     * @param value float the floating point number representing a value
     * @returns {CurrencyValue} CurrencyValue the resulting value object
     */
    static valueOf(value){
        let dollars = Math.abs(Math.trunc(parseFloat(value)));
        dollars = dollars !== null ? dollars : null;
        let cents = Math.abs(Math.trunc(((parseFloat(value) * 100) % 100)));
        cents = cents !== null ? cents : null;

        const isNegative = value < 0;

        return new CurrencyValue(isNegative, dollars, cents);
    }

    /**
     * This static method creates a CurrencyValue object from any object
     * that has the requisite properties of negative, dollars, and cents.
     * There are no checks to ensure that those value can be used to
     * create a valid CurrencyValue object, so be extremely careful using
     * this method.
     *
     * @param negative boolean whether the value is negative
     * @param dollars integer the number of dollars
     * @param cents integer the number of cents
     * @returns {CurrencyValue} CurrencyValue representation of the value
     */
    static from({negative, dollars, cents}){
        return new CurrencyValue(negative, dollars, cents);
    }
}

/**
 * Interface for classes that represent an IGiftHolder.
 * @interface IGiftHolder.
 */
export interface IGiftHolder {
    title: string;
}

/**
 * @Class representing a Wish.
 */
export default class Wish {

    /**
     * Prints the title of the passed IGiftHolder object.
     * @param giftObj  IGiftHolder object.
     */
    printGiftTitle(giftObj: IGiftHolder) : string {
      return giftObj.title;
    }
}


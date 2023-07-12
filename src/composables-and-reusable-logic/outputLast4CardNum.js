export function outputLast4CardNum(srcData) {
    return srcData.cardNumber.slice(15, srcData.cardNumber.length);
  }
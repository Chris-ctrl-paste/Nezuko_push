


module.exports = {
    name: "wordf",
    category: "random",
    run: async (client, message, args) => {


/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 
 
 */

 const search = args[0];
 const sentence = args[1] = args.splice(1).join(" ")



 function occurrences(string, subString, allowOverlapping) {

    string += ``;
    subString += ``;
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    
    return n;
}

return message.channel.send(occurrences(`${sentence}`, `${search}`))

    }
};
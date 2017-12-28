function RandomNum (min,max)
{
	min = Math.floor(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min)) + min;	
}
var num = RandomNum (1,10);
document.write (num);


function TableMaker (start,end)
{	
	document.write(" ");
	return num*num;
	document.write(" ");
}

function OddOrEven (a)
	{
		var a = num;
		if ((a % 2) == 0)
		{
			return " " + 'True';
		}
		return " " + 'False';
	}

document.write (TableMaker (1,10));
document.write (OddOrEven (num));



function abv (min,max)
	{
		min = Math.floor(min); // this rounds up or down the var numbers i put in (mainly used when number is not placed manually)
  		max = Math.ceil(max);
  		return Math.floor(Math.random() * (max - min)) + min; // this is the actual number generator
  	}

var a = abv (1,4);

switch (a)
{
case 1: 
document.write ("This is case 1");
break;

case 2:
document.write ("This is case 2");
break;

case 3:
document.write ("This is case 3");
break;

default: document.write ("default");
}
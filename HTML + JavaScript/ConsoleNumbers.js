	var year = new Date ();
	console.log (year.getFullYear());

	function ConsoleNumbers()
  	{
  		for (var i = 1; i <= 10; i++) {
  			console.log (i);
  		}
  	}

  	ConsoleNumbers ();

  	function GetYear (getFullYear)
  	{
  		if ((getFullYear % 4) == 0)
  			{return "Leaping";}
  			return "Not leaping";
  	}

  	GetYear (year.getFullYear());

  	console.log (GetYear (2010));
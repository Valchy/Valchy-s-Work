	// In a "if" '||' = or and '&&' = and

	function NumberAdding (a)
		/*for (var i = 1; i <= a; i=i+1) {
  		console.log (i);
  		} 
  		if (a < 0)
  		return ;
  		var result = 0;
  		var i = 1;
  		while(i <= a)
  		{
  			result = result + i;		
  			i = i+1;
  		}
  		console.log (result)
  	} */
  		

	{	
		var i = 1;
		var result = 0
  		do 
  		{
  			result = result + i;
  			i = i+1;
  		}
  		while(i <= a);
  		console.log (result)
	}

	NumberAdding (4);

	function RandomNumber(min, max) 
	{
		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min;
  		document.write ()
  	}
  		// Логиката трябваше да я намеря в интърнет
	var results = RandomNumber (1,10);	

	console.log (results);


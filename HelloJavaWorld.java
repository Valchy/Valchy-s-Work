public class HelloJavaWorld {
	public static void main (String [] args) {
		System.out.println('Hello Java World');
		String stringVariable = 'My name is Valeri';
		int integerVariable = 3;
		double decimalPointsVariable = 4.342;
		float floatVariable = 4.5f;
		char singleQuotesVariable = '!'; // or A

		// This will return true or false
		int randomInteger = 8;
		boolean booleanResult = randomInteger == 8;
		System.out.println(booleanResult);

		// Simple Operations: +, -, /, *
		int value = 10;
		int numberOperations = 4;
		value = value +1;
		value = value *2;
		value = value /3;
		value = value -4;

		numberOperations++;
		numberOperations = 5;

		System.out.println('Random stuff: ' + (value*numberOperations));
	}
}

// This is my first ever java program
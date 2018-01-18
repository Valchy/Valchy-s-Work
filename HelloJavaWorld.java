// This imports a library to read users input
import java.util.Scanner;
public class HelloJavaWorld {
	public static void main (String [] args) {
		System.out.println("Hello Java World");
		String stringVariable = "My name is Valeri";
		int integerVariable = 3;
		double decimalPointsVariable = 4.342;
		float floatVariable = 4.5f;
		char singleQuotesVariable = '!'; // or A

		// This will return true or false
		int randomInteger = 8;
		boolean booleanResult = randomInteger == 8;
		System.out.println(booleanResult);

		// // Simple Operations: +, -, /, *, ++, --, % or Relational Operations: ==, !=, <=, <, >=, > or Logical Operators: && and/or ||
		int value = 10;
		int numberOperations = 4;
		value = value +1;
		value = value *2;
		value = value /3;
		value = value -4;

		numberOperations++;
		numberOperations = 5;
		boolean temp = integerVariable == 3 || floatVariable == 3f;
		boolean tmp = integerVariable == 3 && floatVariable == 3f;

		System.out.println("Random stuff: " + (value * numberOperations));
		System.out.println(temp); // returns true
		System.out.println(tmp); // returns false

		int min = 1;
		int max = 10;
		int storeResult = ((int) (Math.random() * ((max - min) +1))) + min; // returns a number between 1 - 5;
		System.out.println("Random generated number = " + storeResult);

		// Name of Scanner variable is input
		Scanner input = new Scanner(System.in);
		int userNumber = 0;
		userNumber = input.nextInt();
		if (userNumber == storeResult) {
			System.out.println("User Number and Random Number are the same!");
		}
		else if (userNumber == (storeResult+1) || userNumber == (storeResult-1)) {
			System.out.println("User number is 1 more or less than the random number");
		}
		else {
			System.out.println("Numbers to not match, try again :D");
		}
	}
}

// This is my first ever java program
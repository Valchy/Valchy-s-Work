""" This is a multiline
comment """
# This is a comment :D
print("My name is Valeri :D")
result = 'Is the highest number out of your chosen three!' # single or double quotes in python don't make a differece
randomVariable = "I am a string Variable and the variable below me is the number "
randomVariableTwo = 8
randomVariableThree = "8 or eight :D"

# The int after the varibale is not neccessary (works without it) input y default takes answer as string the int makes it and integer
x = int (input("Please type a random number"))
y = int (input("Please type a random number, again"))
z = int (input("Please type a random number, one last time"))
userName = str (input("Type your name"))

# Notice how there is no variable + another variable but instead they are listed wiht a ','
print(userName, 'is the name and', max(x,y,z), result)
print(randomVariable, randomVariableTwo)
# In order to concadinate two variables they have to be the same type e.g string + string
print(randomVariable + randomVariableThree)
# You can use boolean staments using possible operetors: <, >, <=, >=, ==, !=
print((20*2) > 10) # This returns true
# There also are logical operetors: and, or, not
print(10 == 10 and 2 > 1) # This returns true
print(10 < 9 or (20/2) == 11) # This returns false
print(not (10 > 20)) #This reverses the answer and actually will return true

#Imports
import random
randomNumber = random.random() # returns a random number (decimal) between 0 and 1
randomNumberTwo = random.randrange(1, 11) # returns a random number (integer) between 1 and 10 (not 11)
print(randomNumber)
print(randomNumberTwo)
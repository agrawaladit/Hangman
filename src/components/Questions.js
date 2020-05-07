const EasyQuestions = [
	{'spam':'This accounts to a large percentage of the email traffic and is filtered using many techniques such as pattern matching, keyword analysis etc'},
	{'phishing':'This is a fraudulent attempt to obtain sensitive information such as usernames, passwords and credit card details by disguising oneself as a trustworthy entity in an electronic communication.'},
	{'antivirus':'This is one of the most widely-known and popular types of endpoint security solutions'},
	{'hacker':'A person who uses computers to gain unauthorized access to data.'},
	{'endpoint':'This is a remote computing device that communicates back and forth with a network to which it is connected'},
]

const HardQuestions = [
	{'spyware':"This is a software that enables a user to obtain covert information about another's computer activities by transmitting data covertly from their hard drive."},
	{'ransomware':'This is a type of malicious software designed to block access to a computer system until a sum of money is paid'},
	{'keylogger':'This records every keystroke made by a computer user, especially in order to gain fraudulent access to passwords and other confidential information.'},
	{'trojan':'This is a type of malware that is often disguised as legitimate software.'},
	{'firewall':'This is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.'},
]

function randomQuestion(difficulty,num) {

	const question = difficulty === 'Easy'? EasyQuestions[num] : HardQuestions[num]
	console.log(question);
	
	return question
}

export { randomQuestion }
const quizForm = document.getElementById('quiz');
const type = document.getElementById('type');
/*const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const q4 = document.getElementById('q4');
const q5 = document.getElementById('q5');*/
const resultDiv1 = document.getElementById('result1');
const resultDiv2 = document.getElementById('result2');
const resultDiv3 = document.getElementById('result3');
const resultDiv4 = document.getElementById('result4');
const resultDiv5 = document.getElementById('result5');
const resultDiv = document.getElementById('result');
const correctAnswersSafety = ['d','d','b','a','b'];
const correctAnswersPhishing = ['c','a','d','b','a'];
const correctAnswersImpersonation = ['a','b','b','b','b'];
const correctAnswersAds = ['a','a','a','b','b'];
const correctAnswersFiles = ['b','a','a','a','b'];
const correctAnswersVirus = ['b','a','d','b','a'];
const correctAnswersWorms = ['b','b','d','c','a'];
const correctAnswersAdware = ['d','b','a','b','d'];
const correctAnswersTrojans = ['a','d','b','b','b'];
const correctAnswersSpyware = ['a','a','b','b','d'];
const correctAnswersRansomware = ['b','c','b','b','b'];

function checkQuiz(type){
    let score = 0;
    let q1 = document.getElementById('q1');
    let q2 = document.getElementById('q2');
    let q3 = document.getElementById('q3');
    let q4 = document.getElementById('q4');
    let q5 = document.getElementById('q5');
    if (type === "safety"){
        if (q1.value === correctAnswersSafety[0]){
            resultDiv1.innerHTML = "Correct! You should not give your password to anyone.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! If someone gets your password they can get access to your account.";
        }
        if (q2.value === correctAnswersSafety[1]){
            resultDiv2.innerHTML = "Correct! Do not give out personal information.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! Giving out personal information is dangerous.";
        }
        if (q3.value === correctAnswersSafety[2]){
            resultDiv3.innerHTML = "Correct! People can lie on the internet.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! People can make their username or profile anything they want.";
        }
        if (q4.value === correctAnswersSafety[3]){
            resultDiv4.innerHTML = "Correct! Make sure to keep devices up to date for latest security.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! A new update usually contains a security fix.";
        }
        if (q5.value === correctAnswersSafety[4]){
            resultDiv5.innerHTML = "Correct! Wifi can be faked or unsecure so don't enter important info when on public wifi.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Think about warnings when using public wifi.";
        }
    }
    if (type === "phishing"){
        if (q1.value === correctAnswersPhishing[0]){
            resultDiv1.innerHTML = "Correct! Phishing is part of the overarching term social engineering.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! Reread the section above if needed.";
        }
        if (q2.value === correctAnswersPhishing[1]){
            resultDiv2.innerHTML = "Correct! The wishing option probably made this one easy.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! Really, you fell for wishing.";
        }
        if (q3.value === correctAnswersPhishing[2]){
            resultDiv3.innerHTML = "Correct! Extortion would not be social engineering, but still a crime.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! Think about what seems like it would be physical.";
        }
        if (q4.value === correctAnswersPhishing[3]){
            resultDiv4.innerHTML = "Correct! Email spoofing is a huge issue.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Check which answer was discussed above.";
        }
        if (q5.value === correctAnswersPhishing[4]){
            resultDiv5.innerHTML = "Correct! We will talk about impersonation more next section.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Don't worry about this one there will be plenty on impersonation in the next section.";
        }
    }
    if (type === "impersonation"){
        if (q1.value === correctAnswersImpersonation[0]){
            resultDiv1.innerHTML = "Correct! Pretending to be someone you can trust is impersonation.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! This one should be easy for you.";
        }
        if (q2.value === correctAnswersImpersonation[1]){
            resultDiv2.innerHTML = "Correct! Also, if you want you can change the text to wingdings in this learnign platform.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! This one starts with a C.";
        }
        if (q3.value === correctAnswersImpersonation[2]){
            resultDiv3.innerHTML = "Correct! It is not always easy to tell real from fake.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! You must have though the interactive activity was easy then.";
        }
        if (q4.value === correctAnswersImpersonation[3]){
            resultDiv4.innerHTML = "Correct! Just because it says its from the government doesn't mean it is.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! But was it really from the government. Always verify.";
        }
        if (q5.value === correctAnswersImpersonation[4]){
            resultDiv5.innerHTML = "Correct! You can paste a link into some websites to verify them.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Don't click links without making sure they are safe first.";
        }
    }
    if (type === "ads"){
        if (q1.value === correctAnswersAds[0]){
            resultDiv1.innerHTML = "Correct! Think of a Hoax as a lie.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! If got this one wrong and didn't click a type of virus you need to reread this section.";
        }
        if (q2.value === correctAnswersAds[1]){
            resultDiv2.innerHTML = "Correct! All pop-ups are super, super bad.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! Look above and read again.";
        }
        if (q3.value === correctAnswersAds[2]){
            resultDiv3.innerHTML = "Correct! Almost anything can contain malware.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! You thought.";
        }
        if (q4.value === correctAnswersAds[3]){
            resultDiv4.innerHTML = "Correct! Websites may outsource their ads and not verify all of them are good.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! This one was a little tricky.";
        }
        if (q5.value === correctAnswersAds[4]){
            resultDiv5.innerHTML = "Correct! Not all but some.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Not all but some.";
        }
    }
    if (type === "files"){
        if (q1.value === correctAnswersFiles[0]){
            resultDiv1.innerHTML = "Correct! exe = executable. ";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! Even if you don't use Windows you should know this one.";
        }
        if (q2.value === correctAnswersFiles[1]){
            resultDiv2.innerHTML = "Correct! It can be hidden.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! This one was supposed to be hard.";
        }
        if (q3.value === correctAnswersFiles[2]){
            resultDiv3.innerHTML = "Correct! If you got this one I am suprised.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! I thought so.";
        }
        if (q4.value === correctAnswersFiles[3]){
            resultDiv4.innerHTML = "Correct! No, but a human can.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Do you like my jokes.";
        }
        if (q5.value === correctAnswersFiles[4]){
            resultDiv5.innerHTML = "Correct! This one tested your eye for spelling.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Check the spelling.";
        }
    }
    if (type === "virus"){
        if (q1.value === correctAnswersVirus[0]){
            resultDiv1.innerHTML = "Correct! Program not file.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! If you didn't pick a joke answer check the second word.";
        }
        if (q2.value === correctAnswersVirus[1]){
            resultDiv2.innerHTML = "Correct! A virus is malware but not the opposite.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! This one starts with m.";
        }
        if (q3.value === correctAnswersVirus[2]){
            resultDiv3.innerHTML = "Correct! Ads are not malware.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! Some of these we will discuss in later sections.";
        }
        if (q4.value === correctAnswersVirus[3]){
            resultDiv4.innerHTML = "Correct! A scanner may not notice everything.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Nothing is perfect.";
        }
        if (q5.value === correctAnswersVirus[4]){
            resultDiv5.innerHTML = "Correct! You're right.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Yes it can.";
        }
    }
    if (type === "worms"){
        if (q1.value === correctAnswersWorms[0]){
            resultDiv1.innerHTML = "Correct! It can replicate itself.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! This one is not the insect.";
        }
        if (q2.value === correctAnswersWorms[1]){
            resultDiv2.innerHTML = "Correct! It is more dangerous.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! A virus is usually not that bad.";
        }
        if (q3.value === correctAnswersWorms[2]){
            resultDiv3.innerHTML = "Correct! They can do it all.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! Try them all.";
        }
        if (q4.value === correctAnswersWorms[3]){
            resultDiv4.innerHTML = "Correct! This is not an illness.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Think about this one again.";
        }
        if (q5.value === correctAnswersWorms[4]){
            resultDiv5.innerHTML = "Correct! You want to isolate it.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! You need to think.";
        }
    }
    if (type === "adware"){
        if (q1.value === correctAnswersAdware[0]){
            resultDiv1.innerHTML = "Correct! Usually long is right.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! Pick a longer answer.";
        }
        if (q2.value === correctAnswersAdware[1]){
            resultDiv2.innerHTML = "Correct! Nothing is immune.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! You must believe in Apple.";
        }
        if (q3.value === correctAnswersAdware[2]){
            resultDiv3.innerHTML = "Correct! Pop-up ads can be part of this.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! This one should have been obvious.";
        }
        if (q4.value === correctAnswersAdware[3]){
            resultDiv4.innerHTML = "Correct! Always think first.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Think.";
        }
        if (q5.value === correctAnswersAdware[4]){
            resultDiv5.innerHTML = "Correct! Usually when there is all of the above it is the correct answer.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! Kind of.";
        }
    }
    if (type === "trojans"){
        if (q1.value === correctAnswersTrojans[0]){
            resultDiv1.innerHTML = "Correct! Longest answer is correct.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! Think more broadly.";
        }
        if (q2.value === correctAnswersTrojans[1]){
            resultDiv2.innerHTML = "Correct! Adware is not a trojan but it is a problem.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! I just went over this.";
        }
        if (q3.value === correctAnswersTrojans[2]){
            resultDiv3.innerHTML = "Correct! It is not a human.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! How.";
        }
        if (q4.value === correctAnswersTrojans[3]){
            resultDiv4.innerHTML = "Correct! Nothing is immune.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Mobile doesn't always mean better.";
        }
        if (q5.value === correctAnswersTrojans[4]){
            resultDiv5.innerHTML = "Correct! It would be scary if they could.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! You must be getting confused.";
        }
    }
    if (type === "spyware"){
        if (q1.value === correctAnswersSpyware[0]){
            resultDiv1.innerHTML = "Correct! You read this one carefully.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! Read this one carefully.";
        }
        if (q2.value === correctAnswersSpyware[1]){
            resultDiv2.innerHTML = "Correct! Spyware can be very bad.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! Really, ads.";
        }
        if (q3.value === correctAnswersSpyware[2]){
            resultDiv3.innerHTML = "Correct! It can collect lots of things.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! If you are lucky maybe.";
        }
        if (q4.value === correctAnswersSpyware[3]){
            resultDiv4.innerHTML = "Correct! They are spying on you and don't want to get caught.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! It would be nice though.";
        }
        if (q5.value === correctAnswersSpyware[4]){
            resultDiv5.innerHTML = "Correct! They would need an actual spy to do this.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! It can get that.";
        }
    }
    if (type === "ransomware"){
        if (q1.value === correctAnswersRansomware[0]){
            resultDiv1.innerHTML = "Correct! Give me the money.";
            score += 1;
        }
        else{
            resultDiv1.innerHTML = "Wrong! This one does not start with an a.";
        }
        if (q2.value === correctAnswersRansomware[1]){
            resultDiv2.innerHTML = "Correct! FBI open up.";
            score += 1;
        }
        else{
            resultDiv2.innerHTML = "Wrong! Think of who could help.";
        }
        if (q3.value === correctAnswersRansomware[2]){
            resultDiv3.innerHTML = "Correct! They don't have to do anything.";
            score += 1;
        }
        else{
            resultDiv3.innerHTML = "Wrong! They shouldn't even attack to begin with.";
        }
        if (q4.value === correctAnswersRansomware[3]){
            resultDiv4.innerHTML = "Correct! You can buy it, I won't tell you how to though.";
            score += 1;
        }
        else{
            resultDiv4.innerHTML = "Wrong! Do not buy it though.";
        }
        if (q5.value === correctAnswersRansomware[4]){
            resultDiv5.innerHTML = "Correct! It can happen as many times as you get attacked.";
            score += 1;
        }
        else{
            resultDiv5.innerHTML = "Wrong! You don't become immune after one time.";
        }
    }
    console.log(type);
    resultDiv.innerHTML = `Your score is ${score}/5`;
  }

quizForm.addEventListener('submit', e => checkQuiz(type.getAttribute("data-value"), e.preventDefault()))
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initalize(passport,getUserByUname){
	const authenticateUser= async (uname,psw,done) =>{
		const user = getUserByUname(uname)
		if(user == null){
			return done(null, false, {message: 'user not found'})
		}
		try{
			if(await bcrypt.compare(psw, user.psw)){

			}
			else{
				return done(null,false,{message:'incorrect password'})
			}
		}catch(e){
			return(done(e))
		}
	}
	passport.use(new LocalStrategy({usernameField: 'uname'}, authenticateUser))
	passport.serializeUser((user,done)=>{ })
	passport.deserializeUser((id,done)=>{
	return done(null, getUserById(id)) })
}


module.exports = initalize
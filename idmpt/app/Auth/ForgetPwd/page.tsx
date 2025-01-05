

function ForgetPwd() {
    return (
      <>
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-56 pb-3 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-60">
      <form method="post" className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <header>    
              <div className="text-2xl font-semibold text-blue-600 pb-5">Idempotent 
              <p className="text-xl font-normal text-gray-700 pb-6">Forget Password</p>
              </div>
             
          </header>
       
        
        <div className="mb-2">
          <label htmlFor="email" className="block text-lg font-normal text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
          />
        </div>
    
     
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-normal rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Email
          </button>
        </div>
        <p className="text-start mt-5 text-gray-700">
                Check your an e-mail{' '}
          
          </p>
          
      </form>
    </div>
      </>
    )
  }
  
  export default ForgetPwd
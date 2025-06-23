const devEnv = {
  envName: 'DEV',
  uiBaseUrl: 'https://www.saucedemo.com/',
  apiBaseUrl: 'https://restful-booker.herokuapp.com',

  users: {
    standard_user: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    locked_out_user: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem_user: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performance_glitch_user: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    },
    error_user: {
      username: 'error_user',
      password: 'secret_sauce'
    },
    visual_user: {
      username: 'visual_user',
      password: 'secret_sauce'
    }
  },
  admin: {
    username: 'admin',
    password: 'password123'
  }
};

export default devEnv;

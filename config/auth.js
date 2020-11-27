module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    // console.log('2');
    // console.log(req.method);
    // console.log(req.path);
    // const user = req.user;
    //console.log('user:%s', user);
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/pharmacyspace');      
  }
};

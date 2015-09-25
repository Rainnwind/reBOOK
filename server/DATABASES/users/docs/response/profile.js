module.exports = function(_couch_profile) {

    this.id                 = "user";    

    this.user_id            = _couch_profile._id;

    this.first_name         = _couch_profile.first_name;

    this.last_name          = _couch_profile.last_name;

    this.email              = _couch_profile.email;

    this.phone_no           = _couch_profile.phone_no;

    this.created            = _couch_profile.created;

    this.verified_since     = _couch_profile.verified_since;

}
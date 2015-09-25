import DS from 'ember-data';

export default DS.Model.extend({

    user_id                     : DS.attr("string"),

    first_name                  : DS.attr("string"),
    last_name                   : DS.attr("string"),
    email                       : DS.attr("string"),
    phone_no                    : DS.attr("string"),

    terms_accepted              : DS.attr("boolean"),

    created                     : DS.attr("number"),
    verfied_since               : DS.attr("number"),

});

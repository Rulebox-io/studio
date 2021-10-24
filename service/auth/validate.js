/**
 * Validates the user's authorisation level. This function determines
 * if the user has access to the specified tenant and role.
 * @param {object} user The user object.
 * @param {string} tenant The tenant.
 * @param {string} role The role.
 */
module.exports = (user, tenant, role) => {
    
    const memberships = user["https://rulebox.io/memberships"];
    if(!memberships) return false;

    const membership = memberships.find(m=>m.tenant==tenant);
    if(!membership) return false;

    if(undefined==role) return true;
    
    return !!membership.roles && !!membership.roles.find(r=>r==role);
}
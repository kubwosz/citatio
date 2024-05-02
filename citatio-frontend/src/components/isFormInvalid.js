export const isFormInvalid = err => {
    if (Object.keys(err).length > 0) return true
    console.log("FormNotValid");
    return false
  }

  export function findInputError(errors, name) {
    console.log("findInputError");
    const filtered = Object.keys(errors)
      .filter(key => key.includes(name))
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] })
      }, {})
    return filtered
  }
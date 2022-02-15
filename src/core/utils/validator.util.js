/**
 *  Metodo para aplicar validaciones a un objeto
 * @param {*} objToCheck objeto a validar
 * @param {*} rulesObject {rules: {}, messages: {}}
 * @returns Promise
 */
const check = ( objToCheck, rulesObject ) => {
  return new Promise( ( resolve, reject ) => {
    let errors = []
    Object.entries( rulesObject.rules ).forEach( ( [property, rule] ) => {
      const value = objToCheck[property]
      const methods = rule.split( '|' )
      methods.forEach( method => {
        if ( methodHasParams( method ) ) {
          const methodParams = method.split( ':' )
          const methodName = methodParams[0]
          const methodParamsValues = methodParams[1].split( ',' )
          const methodParamsValuesParsed = methodParamsValues.map( param => {
            if ( param.indexOf( '.' ) > -1 ) {
              const paramSplit = param.split( '.' )
              return objToCheck[paramSplit[0]][paramSplit[1]]
            }
            return param
          } )
          if ( !validators[methodName]( value, ...methodParamsValuesParsed ) ) {
            pushError( errors, property, getMessageForProperty( property, rulesObject.messages, methodName ) )
          }
        } else {
          if ( !validators[method]( value ) ) {
            pushError( errors, property, getMessageForProperty( property, rulesObject.messages, method ) )
          }
        }
      } )
    } )
    if ( errors.length > 0 ) {
      reject( errors )
    } else {
      resolve()
    }
  } )
}

const pushError = ( errors, property, message ) => {
  if ( !errors.some( error => error.property === property ) ) {
    errors.push( {
      property,
      message: [message]
    } )
  } else {
    const errorIndex = errors.findIndex( error => error.property === property )
    errors[errorIndex].message.push( message )
  }
  return errors
}

const getMessageForProperty = ( property, messages, error ) => {
  if ( messages && typeof messages[property] !== 'string' ) {
    return messages[property][error]
  } else {
    return messages[property]
  }
}

const methodHasParams = methodString => {
  if ( methodString.indexOf( ':' ) > -1 ) {
    return true
  }
  return false
}

// validators

const maxLength = ( value, maxLength ) => {
  if ( value && value.length > parseInt( maxLength ) ) {
    return false
  }
  return true
}

const minLength = ( value, minLength ) => {
  if ( value && value.length < parseInt( minLength ) ) {
    return false
  }
  return true
}

const email = value => {
  if ( !value?.match( /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i ) ) {
    return false
  }
  return true
}

const required = value => {
  if ( value === undefined || value === null || value === '' ) {
    return false
  }
  return true
}

const validators = {
  maxLength,
  minLength,
  email,
  required
}
export const ValidatorUtil = {
  check
}

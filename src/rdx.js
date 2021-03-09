

import { createStore, combineReducers } from 'redux'

import { v4 as uuidv4 } from 'uuid'
import { date } from 'date-and-time'

const persons = [{
    id: uuidv4(),
    name: 'fname',
    lname: 'lname',
    lut: new Date()
}]

const addPerson = ({ name, lname }) => {
    return {
        type: 'PERSON_ADD',
        person: {
            id: uuidv4(),
            lut: new Date(),
            name,
            lname
        }
    }
}

const editPerson = (id, person) => ({
    type: 'PERSON_EDIT',
    id,
    person
})

const removePerson = (id) => ({
    type: 'PERSON_REMOVE',
    id
})

const handleRemovePerson = ({ents}},id) => (
    ents.filter((p)=>(id !== p.id))
)

const dbStore =
    (state = { ents: persons }, action) => {
        switch (action.type) {
            case 'PERSON_ADD': 
                return {
                    ents: [
                        ...persons,
                        action.person]
                }
            case 'PERSON_REMOVE':
                return handleRemovePerson(action.id,state.ents)
            default:
                return state
        }
    }


const dbFilter = (state = {}, actions) => {
    return state
}

const rdsc = combineReducers({
    db: dbStore,
    flter: dbFilter
})
const store = createStore(rdsc)

store.subscribe(() => {
    console.log(store.getState())
})

const { person: { id: a } } = store.dispatch(addPerson({
    name: 'natan',
    lname: 'pekerman'
}))

// let {person:{id}} = state

console.log(a)
store.dispatch(removePerson(a))
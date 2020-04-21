
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dynamic from 'next/dynamic'
import * as DayComponent from './Day'


const DynamicCalendar = dynamic(
    () => import('./Calendar'),
    {
        ssr: false
    }
);

// ----- initial state --- 

export const initialState = {
    calendarState: "month",
    date: "",
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date() },
      { title: "Event Nowaa", date: "2020-04-11" }
    ]
};

// ---- type ----- 

export const types = {
    CHANGE_CALENDAR_STATE: 'CHANGE_CALENDAR_STATE'
};



// ---- action ----- 

export const actions = {
    
}



// ---- reducer ----- 

export function reducer(state = initialState, action) {
    const payload = action.payload;
    switch (action.type) {
        case types.CHANGE_CALENDAR_STATE:
            return { ...state, calendarState: payload.calendarState , date: payload.date }
        
        default:
            return state
    }
}




// ---- Component ----


const Main = ({ calendarState }) => {
    return (
        <div className="">
            <style jsx global>{`
               
            `}</style>
        { calendarState == "month" ? <DynamicCalendar/> : <DayComponent.view />}
        </div>
    )
}


const mapStateToProps = (state) => ({
    calendarState: state.main.calendarState
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
})

const view = connect(mapStateToProps, mapDispatchToProps)(Main)
export { view }


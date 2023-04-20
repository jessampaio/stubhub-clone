import React from 'react';

interface EventContextType {
    eventInfo: Record<string, any>;
    setEventInfo: any;
    resetEventInfo: any;
}

const EventContext = React.createContext<EventContextType>({} as EventContextType)

export default EventContext;
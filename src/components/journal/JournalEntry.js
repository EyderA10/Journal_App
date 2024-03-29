import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNotes } from '../../actions/notes';

export const JournalEntry = ({ note }) => {

    const { id, date, title, body, url } = note;

    const noteDate = moment(date);

    const dispatch = useDispatch();

    const hanldeEntryActive = () => {
        dispatch(activeNotes(id, note));
    };

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={hanldeEntryActive}
        >

            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }



            <div className="journal__entry-body">
                <p className="journal_entry-title">
                    {title}
                </p>

                <p className="journal_entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    );
};

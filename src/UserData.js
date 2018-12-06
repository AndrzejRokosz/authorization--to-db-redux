import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import {
    textChange,
    saveTextToDbAsyncAction
} from './state/userData'

const UserData = (props) => (
    <Paper
        style={{
            margin: 20,
            padding: 20
        }}
    >

        <TextField
            name="text"
            type="text"
            floatingLabelText="Some text"
            value={props._text}
            onChange={props._textChange}
            fullWidth={true}
        />
        <RaisedButton
            style={{ margin: '5px 0' }}
            label={'Save to db'}
            primary={true}
            onClick={props._save}
            fullWidth={true}
        />
    </Paper>
)

const mapStateToProps = state => ({
    _text: state.userData.text

})
const mapDispatchToProps = dispatch => ({
    _textChange: (event) => dispatch(textChange(event.target.value)),
    _save: () => dispatch(saveTextToDbAsyncAction())

})

export default connect(mapStateToProps, mapDispatchToProps)(UserData)
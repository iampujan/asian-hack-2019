import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';

import {submitComplaint} from '../utils/makeRequest';

import {updateNewComplaint} from '../actions/complaintAction';

class AddComplaint extends Component {
  state = {
    complaintBody: '',
    saving: false,
  };

  handleSubmit = () => {
    this.setState({saving: true}, () => {
      const {
        device: {deviceId},
      } = this.props;
      const complaint = {
        deviceId,
        body: this.state.complaintBody,
      };
      submitComplaint(complaint, this.updateStoreAfterSaved);
    });
  };

  updateStoreAfterSaved = complaint => {
    const {deviceId, body, upVote, downVote, _id} = complaint;
    const newComplaint = {
      deviceId,
      body,
      upVote,
      downVote,
      _id,
    };
    this.props.updateNewComplaint(newComplaint);
    this.setState({saving: false, complaintBody: ''});
    this.props.navigation.navigate('Complaint');
  };

  render() {
    const {saving} = this.state;
    return (
      <View style={{flex: 1, padding: 10}}>
        <Text>Write your complaint</Text>
        <TextInput
          multiline
          placeholder="Write your complaint"
          onChangeText={text => this.setState({complaintBody: text})}
          value={this.state.complaintBody}
          numberOfLines={12}
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 10,
            textAlignVertical: 'top',
          }}
        />
        <Button
          title={saving ? 'Submitting' : 'Submit complaint'}
          onPress={this.handleSubmit}
          disabled={saving}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    device: state.device,
  };
};

export default connect(
  mapStateToProps,
  {updateNewComplaint},
)(AddComplaint);

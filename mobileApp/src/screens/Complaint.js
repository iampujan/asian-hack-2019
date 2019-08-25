import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {fetchComplaints} from '../utils/makeRequest';
import {updateComplaints} from '../actions';

class Complaint extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    fetchComplaints(this.updateComplaintsData);
  }

  updateComplaintsData = complaints => {
    this.props.updateComplaints(complaints);
    this.setState({
      loading: false,
    });
  };

  goToAddComplaintPage = () => {
    this.props.navigation.navigate('AddComplaint');
  };

  render() {
    const {loading} = this.state;
    const {complaints} = this.props.complaint;
    console.log(complaints);
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[styles.rowContainer]}>
          <Text style={{fontWeight: '600', fontSize: 18}}>Complaints</Text>
          <TouchableOpacity onPress={this.goToAddComplaintPage}>
            <Icon name="plus-circle" size={25} />
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={{flex: 1, justifyContent: 'center', height: 300}}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && (
          <View style={{flex: 1, padding: 5}}>
            {complaints.map(complaint => (
              <View key={complaint._id} style={styles.cardContainer}>
                <View style={{padding: 10}}>
                  <Text>{complaint.body}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={[styles.actionButton, {backgroundColor: '#88ffcd'}]}>
                    <Icon name="thumbs-up" size={20} color="#00884e" />
                    <Text style={[styles.actionText, {color: '#00884e'}]}>
                      50
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, {backgroundColor: '#ff9188'}]}>
                    <Icon name="thumbs-down" size={20} color="#880a00" />
                    <Text style={[styles.actionText, {color: '#880a00'}]}>
                      50
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    margin: 5,
    backgroundColor: '#fff',
    shadowColor: '#d9d9d9',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  actionButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

const mapStateToProps = state => {
  return {
    complaint: state.complaint,
  };
};

export default connect(
  mapStateToProps,
  {updateComplaints},
)(Complaint);

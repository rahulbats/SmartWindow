import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#2A8CEF',
        marginTop:60
    },
    heading: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomWidth: 1,
        //borderBottomColor: 'white'
    },
    text: {
       color: 'white'
    },
    headingText: {
        fontWeight: 'bold'
    },
    input: {
        height:40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        borderRadius:2,
        paddingLeft: 10

    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    logo: {
            flex: 1,
            width: 100,
            height: 60,
            resizeMode: 'contain',
            marginTop:40,
            marginBottom:40
    },  
    logoContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20
    } ,
  navigationBar:{
    backgroundColor: '#2A8CEF'
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'white'
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
    color: 'white'
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'blue',
  },
});
export default styles;
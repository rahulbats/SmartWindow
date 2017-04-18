import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop:60
    },
    heading: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomWidth: 1,
        //borderBottomColor: 'white'
    },
   
    headingText: {
        fontWeight: 'bold'
    },
    input: {
        alignSelf: 'stretch',
        //textAlign: 'center',
        marginBottom: 20,
        borderRadius:2,
        paddingLeft: 10,
        height: 30
    },
    button: {
        alignSelf: 'stretch',
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
        backgroundColor:'#2A8CEF',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    } ,
  navigationBar:{
    backgroundColor: '#2A8CEF'
  },
   navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: "white",
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  }
});
export default styles;
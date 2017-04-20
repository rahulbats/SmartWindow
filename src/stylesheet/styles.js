import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop:60,
        //backgroundColor: '#f1f1f1'
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
            //width: 100,
            //height: 60,
            resizeMode: 'contain',
    },  
    logoContainer: {
        //backgroundColor:'#2A8CEF',
        //flexDirection: 'row',
        position: 'absolute',
        top: 0
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
  },
   card: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 10,
        margin:10,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        borderColor: 'lightgrey',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 2,
        },
     },
});
export default styles;
export {default as HomeScreen} from './home'
export {default as TaskList} from './task-list'
export {default as SelectTasks} from './select-tasks'
export {default as FrequencySelector} from './frequency-selector'
export {default as Scores} from './scores'
export {default as LoginScreen} from './login'
export {default as PlayerDetail} from './player-detail'
export {default as PlayerDetailEdit} from './player-detail-edit'
export {default as Sidebar} from './sidebar'

import HomeScreen from './home'
import PlayerDetail from './player-detail'
import PlayerDetailEdit from './player-detail-edit'
import Scores from './scores'
import FrequencySelector from './frequency-selector'
import TaskList from './task-list'
import { DrawerNavigator } from 'react-navigation';
import Sidebar from './sidebar'

const SidebarRouter = DrawerNavigator (

    {
        Home: {screen:HomeScreen},
        Profile: {screen:PlayerDetail},
        ProfileEdit: {screen: PlayerDetailEdit},
        Scores: {screen:Scores},
        Tasks: {screen:TaskList},
        FrequencySelector: {screen: FrequencySelector}



    },
    {
        contentComponent: props => <Sidebar {...props}/>
    }
)

export default SidebarRouter;
export {default as Signup} from './signup'

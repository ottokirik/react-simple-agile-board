import {
  AppBar,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import { User } from 'components/shared/User';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  const { boards, users } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Dashboard:</Typography>
              <FormControl variant="outlined">
                <Select
                  style={{ backgroundColor: 'white', marginLeft: 10 }}
                  value={boards?.active?.id || ''}
                  onChange={() => {}}
                >
                  <MenuItem value="" disabled>
                    -
                  </MenuItem>
                  {boards.list.map((board) => {
                    return (
                      <MenuItem key={board.id} value={board?.id}>
                        {board?.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <User user={users?.me} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

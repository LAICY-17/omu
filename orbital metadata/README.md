This is the readme  
kappa

---
## How to clone this repository in your computer
Navigate to the folder you want to store this repo locally (will be stored as a folder labelled 'omu').
Then, enter this into Terminal:
`git clone https://github.com/bokwoon95/omu`

## How to pull updates from this repository
**Always pull before you start work on anything! To make sure you're always working on the latest copy.**  
Enter `git pull`  
### Caveat
If you have any local files that might be overwritten by `pull`, first backup your local data with `git stash`  
Then `git pull`  
And merge in your backed-up data with `git stash pop`  
*Be aware that you might run into file conflicts*
## How to sync changes to this repository
Git =/= Github. Git is the local file control system('software') stored in your computer.
Github is the where Git repositories are stored online for people to access(kind of like Dropbox for Git folders).  

### Adding, Committing and Pushing

**ADDING** means adding files to the Index (or Staging Area). Index is where files go before they are *committed*, so you can review them.
To see all currently Indexed/Staged (or modified/untracked) files, type `git status`.  
**COMMITTING** means to save your current folder into a snapshot (a 'save state') that you can rollback to in the future.
Commit only when you are satisfied with your changes!  
**PUSHING** will synchronise your computer's repo with the Github repo found online on [https://github.com/bokwoon95/omu](https://github.com/bokwoon95/omu).  

To **Add** all changed files to Index: `git add .`  
To unindex/unstage a particular file, type `git reset <filename>`, or `git reset .` to unindex everything.  
To **Commit** an Indexed file: `git commit <filename> -m "<give a brief description of what you modified/added>"`  
To **Push**: `git push`  

If there are any merge conflicts, google how to resolve it cos I still have not looked it up (involves something called `git mergetool`).




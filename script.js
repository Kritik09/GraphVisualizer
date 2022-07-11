let r=25
let c=25
let adj=[]
let vis=[]
let par=[]
let dx=[1,-1,0,0]
let dy=[0,0,1,-1]
let source=0
let destination=-1
let obstacle=new Set
let path=new Set
let flag="source"
let algorthm="bfs"
let animationInterval=[]
let grid=document.getElementById("grid")
grid.style.gridTemplateColumns=`repeat(${c},1fr)`
grid.style.gridTemplateRows=`repeat(${r},1fr)`
for(let i=0;i<r*c;i++){
        let node=document.createElement('div')
        node.classList.add('blocks')
        grid.appendChild(node)
        let id=i
        id.toString(10)
        node.setAttribute("id",`${id}`)
}
let blocks=document.getElementsByClassName('blocks')
Array.from(blocks).forEach((element,index)=>{
    element.addEventListener("click",()=>{
        if(flag=="source"){
            source=index
            destination=destination==index?-1:destination
        }
        else if(flag=="destination"){
            destination=index
            source=source==index?-1:source
        }
        else if(flag=="obstacle"){
            if(obstacle.has(index)){
                obstacle.delete(index)
            }
            else{
                obstacle.add(index)
            }
        }
        obstacle.delete(destination)
        obstacle.delete(source)
        solve()
        draw()
    })
})

function draw(){
    Array.from(blocks).forEach(e=>{
        e.classList.remove('source')
        e.classList.remove('destination')
        e.classList.remove('obstacle')
        e.classList.remove('path')
    })
    let src=document.getElementById(`${source}`)
    let des=document.getElementById(`${destination}`)
    if(src){
        src.classList.add('source')
    }
    if(des){
        des.classList.add('destination')
    }
    obstacle.forEach(element=>{
        let el=element
        el.toString(10)
        document.getElementById(`${el}`).classList.add('obstacle')
    })
    for(let i=0;i<animationInterval.length;i++){
        clearInterval(animationInterval[i])
    }
    let count=0
    let intervalValue=0
    let values=[]
    path.forEach(element=>{
        values.push(element)
    })
    values.reverse()
    values.forEach(element=>{
        let el=element
        el.toString(10)
        animationInterval[intervalValue++]=setInterval(()=>{
            document.getElementById(`${el}`).classList.add('path')
        },10+count)
        count+=10
    })
}

draw()
function sourceFlag(){
    flag="source"
}
function destinationFlag(){
    flag="destination"
}
function obstacleFlag(){
    flag="obstacle"
}

function solve(){
    let si=-1,sj=-1
    let di=-1,dj=-1
    adj=[]
    vis=[]
    par=[]
    for(let i=0;i<r;i++){
        adj[i]=[]
        vis[i]=[]
        par[i]=[]
        for(let j=0;j<c;j++){
            if((i*c+j)==source){
                si=i,sj=j
                adj[i][j]=1
            }
            else if((i*c+j)==destination){
                adj[i][j]=2
                di=i,dj=j
            }
            else if(obstacle.has(i*c+j)){
                adj[i][j]=-1
            }
            else{
                adj[i][j]=0 
            }
            vis[i][j]=0
            par[i][j]=[-1,-1]
        }
    }
    if(algorthm=="bfs"){
        bfs(si,sj,vis,adj,par)
    }
    if(algorthm=="dfs"){
        dfs(si,sj,vis,adj,par)
    }
    if(di!=-1 && dj!=-1){
        tracePath(par,di,dj)    
    }
    draw()
}
function tracePath(par,i,j){
    path.clear()
    while(par[i][j][0]!==-1 && par[i][j][1]!==-1){
        let ni=par[i][j][0]
        let nj=par[i][j][1]
        i=ni,j=nj
        if(par[i][j][0]!=-1 && par[i][j][1]!=-1)
        path.add(i*c+j)
    }
}
function bfs(si,sj,vis,adj,par){
    vis[si][sj]=1
    let front=0
    let queue=[]
    queue.push([si,sj])
    while(front < queue.length){
        let x=queue[front][0]
        let y=queue[front][1]
        for(let i=0;i<4;i++){
            let nx=x+dx[i]
            let ny=y+dy[i]
            if(valid(nx,ny,vis,adj)){
                par[nx][ny]=[x,y]
                vis[nx][ny]=1
                queue.push([nx,ny])
            }
        }
        front++
    }
}
function dfs(si,sj,vis,adj,par){
    vis[si][sj]=1
    for(let i=0;i<4;i++){
        let nx=si+dx[i]
        let ny=sj+dy[i]
        if(valid(nx,ny,vis,adj) ){
            par[nx][ny]=[si,sj]
            dfs(nx,ny,vis,adj,par)
        }
    }
}
function valid(si,sj,vis,adj){
    return si>=0 && sj>=0 && si<r && sj<c && vis[si][sj]==0 && adj[si][sj]!=-1
}
function bfsFlag(){
    algorthm="bfs"
    solve()
}
function dfsFlag(){
    algorthm="dfs"
    solve()
}
// function draw(){
//     grid.innerHTML=``
//     for(let i=0;i<r*c;i++){
//             let x=document.createElement("div")
//             x.classList.add('blocks')
//             if(i==source){
//                 x.classList.add('source')
//             }
//             else if(i==destination){
//                 x.classList.add('destination')
//             }
//             else if(obstacle.has(i)){
//                 x.classList.add('obstacle')
//             }
//             else if(path.has(i)){
//                 x.classList.add('path')
//             }
//             grid.appendChild(x)
//     }
//     let blocks=document.getElementsByClassName("blocks")
//     Array.from(blocks).forEach((element,index)=>{
//         element.addEventListener("click",()=>{
//                 if(flag=="source"){
//                     source=index
//                     destination=destination==index?-1:destination
//                 }
//                 else if(flag=="destination"){
//                     destination=index
//                     source=source==index?-1:source
//                 }
//                 else if(flag=="obstacle"){
//                     if(obstacle.has(index)){
//                         obstacle.delete(index)
//                     }
//                     else{
//                         obstacle.add(index)
//                     }
//                 }
//                 obstacle.delete(destination)
//                 obstacle.delete(source)
//                 draw()
//                 solve()
//         })
//     })
// }
// draw()
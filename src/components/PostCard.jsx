
const PostCard = ({ post }) => {

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const postDate = new Date(timestamp);
        const diffMs = now - postDate; // difference in milliseconds
    
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
    
        if (diffDays > 0) {
            return `Posted ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `Posted ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes > 0) {
            return `Posted ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return `Posted just now`;
        }
    };
    
    return(
        <div className="post-card">
            <h4>{getTimeAgo(post.created_at)}</h4>
            <h3>{post.title}</h3>
            <h4>{post.likes} upvotes</h4>
        </div>
    )
}

export default PostCard
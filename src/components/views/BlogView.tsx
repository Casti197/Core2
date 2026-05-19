import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, MessageSquare, User, Send, Plus } from 'lucide-react';
import { Card, Button, Textarea } from '../ui/Base';
import { BLOG_POSTS } from '../../constants';
import { BlogPost, Comment } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export const BlogView = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [customPosts, setCustomPosts] = useState<BlogPost[]>([]);
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>({});
  
  // States for new post form
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");

  const [newCommentText, setNewCommentText] = useState("");
  const [userName, setUserName] = useState("Estudiante");

  // Load posts and comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem('blog_comments');
    const savedPosts = localStorage.getItem('user_blog_posts');
    
    if (savedComments) {
      try { setAllComments(JSON.parse(savedComments)); } 
      catch (e) { console.error("Error loading comments", e); }
    }
    
    if (savedPosts) {
      try { setCustomPosts(JSON.parse(savedPosts)); }
      catch (e) { console.error("Error loading posts", e); }
    }
  }, []);

  const combinedPosts = [...BLOG_POSTS, ...customPosts];

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: BlogPost = {
      id: `user-${Date.now()}`,
      title: newPostTitle.trim(),
      excerpt: newPostContent.trim().substring(0, 100) + "...",
      content: newPostContent.trim(),
      date: "Hoy (Publicado por ti)"
    };

    const updated = [...customPosts, newPost];
    setCustomPosts(updated);
    localStorage.setItem('user_blog_posts', JSON.stringify(updated));
    
    // Reset form
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostAuthor("");
    setIsCreating(false);
  };

  // Save comments to localStorage
  const saveComments = (updatedComments: Record<string, Comment[]>) => {
    setAllComments(updatedComments);
    localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
  };

  const handleAddComment = () => {
    if (!selectedPost || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      userName: userName || "Anónimo",
      text: newCommentText.trim(),
      date: "Ahora mismo"
    };

    const postComments = allComments[selectedPost.id] || [];
    const updated = {
      ...allComments,
      [selectedPost.id]: [...postComments, newComment]
    };

    saveComments(updated);
    setNewCommentText("");
  };

  if (selectedPost) {
    const postComments = allComments[selectedPost.id] || [];

    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-right-4 duration-500">
        <header className="pt-4 px-2">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-rose-500 font-bold text-sm mb-4 transition-transform active:scale-95"
          >
            <ChevronLeft size={18} /> VOLVER AL BLOG
          </button>
          <div className="text-xs font-bold text-rose-500 uppercase mb-2">{selectedPost.date}</div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight uppercase tracking-tighter">
            {selectedPost.title}
          </h2>
        </header>

        <Card className="border-rose-50 shadow-sm p-8">
          <div className="prose prose-slate max-w-none">
            {selectedPost.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-600 text-lg leading-relaxed mb-4 last:mb-0">
                {paragraph.split('\n').map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {line}
                    {lIdx < paragraph.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </Card>

        {/* Sección de Comentarios */}
        <div className="space-y-4 px-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
            <MessageSquare size={20} className="text-rose-500" />
            <h3 className="text-lg uppercase tracking-tight">Comentarios ({postComments.length})</h3>
          </div>

          <div className="space-y-4">
            {postComments.length === 0 ? (
              <p className="text-slate-400 text-sm italic text-center py-4">No hay comentarios aún. ¡Sé el primero!</p>
            ) : (
              postComments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{comment.userName}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="bg-slate-100/50 p-4 rounded-3xl space-y-3">
            <input 
              type="text" 
              placeholder="Tu nombre (opcional)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-rose-300 transition-colors"
            />
            <div className="flex gap-2">
              <Textarea 
                placeholder="Escribe un comentario..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="min-h-12 text-sm"
              />
              <Button 
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="w-12 h-12 p-0 flex-shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-2">
           <Button 
            onClick={() => setSelectedPost(null)} 
            variant="outline" 
            className="w-full py-4"
          >
            Finalizar Lectura
          </Button>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-8 duration-500">
        <header className="pt-4 px-2">
          <button 
            onClick={() => setIsCreating(false)}
            className="flex items-center gap-2 text-slate-400 font-bold text-sm mb-4"
          >
            <ChevronLeft size={18} /> CANCELAR
          </button>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Nueva Reflexión</h2>
          <p className="text-slate-500 text-sm">Comparte algo con la comunidad.</p>
        </header>

        <Card className="space-y-4 border-rose-100 shadow-lg p-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Título del artículo</label>
            <input 
              type="text" 
              placeholder="Ej: Mi descubrimiento sobre la alteridad"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-lg font-bold outline-none focus:border-rose-300 transition-colors"
            />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Contenido completo</label>
             <Textarea 
                placeholder="Escribe aquí tu pensamiento..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[200px]"
             />
          </div>

          <Button 
            onClick={handleCreatePost}
            disabled={!newPostTitle.trim() || !newPostContent.trim()}
            className="w-full py-4 text-lg"
          >
            Publicar en el Blog
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <header className="pt-4 px-2 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Biblioteca Conceptual</h2>
          <p className="text-slate-500 text-sm">Fundamentos breves para fortalecer la mente.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          title="Crear nueva publicación"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="space-y-4 px-2">
        {combinedPosts.map((post) => (
          <Card 
            key={post.id} 
            onClick={() => setSelectedPost(post)}
            className="hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 active:scale-[0.98] border-transparent hover:border-rose-100 relative group"
          >
            {post.id.startsWith('user-') && (
              <div className="absolute top-4 right-4 bg-amber-50 text-amber-600 text-[8px] font-black uppercase px-2 py-1 rounded-full border border-amber-100">
                Tu publicación
              </div>
            )}
            <div className="text-xs font-bold text-rose-500 uppercase mb-2">{post.date}</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
            <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
            <div className="mt-4 flex items-center text-rose-500 font-bold text-xs gap-1">
              LEER MÁS <ChevronRight size={14} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

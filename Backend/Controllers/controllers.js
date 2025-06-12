const User =require('../Models/models')

const createNote= async (req,res)=>{
    try{
        const {title,message,userName}= req.body
        
        const newNote=new User({
            title,message,userName
        })
        await newNote.save()
        res.status(200).json({ success:true,message:'New Note created'})
    }catch(error){
        res.status(400).json({success:false,error:error.message})
        console.log(error)
    }

}

const getNote=async(req,res)=>{
    try{
        const {userName}=req.query
        console.log(userName)
        if(!userName) return res.status(400).json({success:false,message:'User name is required'})
        const notes=await User.find({userName})
        res.json({success:true,notes})
    }catch(error){
        res.status(500).json({success:false,message:'Failed to fetch notes',error:error.message})
    }
}

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await User.findById(id);
        if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
        res.json({ success: true, note });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch note', error: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message } = req.body;
        const updatedNote = await User.findByIdAndUpdate(id, { title, message }, { new: true });
        if (!updatedNote) return res.status(404).json({ success: false, message: 'Note not found' });
        res.json({ success: true, note: updatedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update note', error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await User.findByIdAndDelete(id);
        if (!deletedNote) return res.status(404).json({ success: false, message: 'Note not found' });
        res.json({ success: true, message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete note', error: error.message });
    }
};

module.exports = { createNote, getNote, getNoteById, updateNote, deleteNote };
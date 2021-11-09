<template>
    <div class="meal_wrap" >
        <div class="tinymce-box">
            <TEditor ref="tinymceRef"></TEditor>
        </div>
        <!-- <div>富文本框内容：{{tinymceObj}}</div> -->
        <div class="tinymce-btn">
            <button type="ghost" @click="tinymceClose">清空</button>
            <button type="primary" @click="tinymceSave">确定</button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import TEditor from '@/components/tinymce'
 
export default {
    components: {
        TEditor
    },
    data() {
        return {
            pText:null,
			html:null,
        };
    },
    methods: {
        dutyDetailClick(){
            this.$nextTick(() => {
                let html = '<p><span style="color: rgb(224, 62, 45);" data-mce-style="color: #e03e2d;">1、方便；</span></p><p>2、快捷；</p>';
                if (!html) {
                    html = '';                    
                }
                // 给富文本框赋值
                this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body').innerHTML = html;
            });
        },
         
        tinymceClose(){ 
            // 清空富文本框
            this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body').innerHTML = '';
        },
        tinymceSave(){
            //富文本框保存获取值
            this.pText = this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelectorAll('p');
            this.html = this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body').innerHTML;
			
        }
		
    }
};
</script>
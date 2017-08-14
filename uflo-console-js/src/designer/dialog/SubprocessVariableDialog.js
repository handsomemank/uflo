/**
 * Created by Jacky.Gao on 2017-07-14.
 */
import {MsgBox} from 'flowdesigner';

export default class SubprocessVariableDialog{
    constructor(){
        this.dialog=$(`<div class="modal fade" role="dialog" aria-hidden="true" style="z-index: 10000">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title">
                            从子流程中传出的流程变量配置
                        </h4>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>`);
        const body=this.dialog.find('.modal-body'),footer=this.dialog.find(".modal-footer");
        this.initBody(body,footer);
    }
    initBody(body,footer){
        const nameGroup=$(`<div class="form-group uflo-group"><label>子流程变量名：</label></div>`);
        body.append(nameGroup);
        this.nameEditor=$(`<input type="text" class="form-control uflo-text-editor" style="width: 460px;">`);
        nameGroup.append(this.nameEditor);

        const valueGroup=$(`<div class="form-group uflo-group"><label>传回父流程变量名：</label></div>`);
        body.append(valueGroup);
        this.valueEditor=$(`<input type="text" class="form-control uflo-text-editor" style="width: 433px;">`);
        valueGroup.append(this.valueEditor);

        const saveButton=$(`<button type="button" class="btn btn-default">保存</button>`);
        footer.append(saveButton);
        saveButton.click(()=>{
            if(!this.nameEditor.val() || this.nameEditor.val()===''){
                MsgBox.alert('请输入子流程变量名');
                return;
            }
            if(!this.valueEditor.val() || this.valueEditor.val()===''){
                MsgBox.alert('请输入传回父流程变量名');
                return;
            }
            this.callback.call(this,{inParameterKey:this.nameEditor.val(),outParameterKey:this.valueEditor.val()});
            this.dialog.modal('hide');
        });
    }

    show(data,callback){
        this.dialog.modal('show');
        this.callback=callback;
        this.nameEditor.val(data.inParameterKey);
        this.valueEditor.val(data.outParameterKey);
    }
}
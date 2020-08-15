/*
* Tencent is pleased to support the open source community by making Puerts available.
* Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
* Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may be subject to their corresponding license terms.
* This file is subject to the terms and conditions defined in file 'LICENSE', which is part of this source code package.
*/

declare module "ue" {
    type ArgumentTypes<T> = T extends (... args: infer U ) => infer R ? U: never;

    interface $Ref<T> {}
    
    interface $CallbackID {}
    
    interface $Delegate<T extends (...args: any) => any> {
        Bind(fn : T): void;
        Unbind(): void;
        IsBound(): boolean;
        Execute(...a: ArgumentTypes<T>) : ReturnType<T>;
    }

    interface $MulticastDelegate<T extends (...args: any) => any> {
        Add(fn : T): void;
        Remove(fn : T): void;
        Broadcast(...a: ArgumentTypes<T>) : ReturnType<T>;
    }
    
    class FixSizeArray<T> {
        Num(): number;
        Get(Index: number): T;
        Set(Index: number, Value: T): void;
    }
    
    class TArray<T, Allocator=any> {
        Num(): number;
        Add(Value: T): void;
        Get(Index: number): T;
        Set(Index: number, Value: T): void;
        Contains(Value: T): boolean;
        FindIndex(Value: T): number;
        RemoveAt(Index: number): void;
        IsValidIndex(Index: number): boolean;
        Empty(): void;
    }
    
    class TSet<T> {
        Num(): number;
        Add(Value: T): void;
        Get(Index: number): T;  // TODO - 这个接口要用Index吗？
        // Set(Index: number, Value: T): void;
        Contains(Value: T): boolean;
        FindIndex(Value: T): number;
        RemoveAt(Index: number): void;
        GetMaxIndex(): number;  // TODO - GetMaxIndex的返回值是InvalidIndex，合理吗？（GetMaxIndex的解释应该是：最大合法index+1），当调用Empty，返回值为0
        IsValidIndex(Index: number): boolean;
        Empty(): void;
    }
    
    class TMap<TKey, TValue> {
        Num(): number;
        Add(Key: TKey, Value: TValue): void;
        Get(Key: TKey): TValue | undefined;
        Set(Key: TKey, Value: TValue): void;    // 即Add()。TODO - 有存在的必要吗？
        Remove(Key: TKey): void;
        GetMaxIndex(): number;                  // TODO - 接口注释要说明返回的是kv的索引。只有调用了Empty后才会返回0
        IsValidIndex(Index: number): boolean;
        GetKey(Index: number): TKey;            // TODO - 对于非法index，是否应该返回undefined
        Empty(): void;
    }
    
    type DataPropertyNames<T> = {
        [K in keyof T]: T[K] extends (...args: any) => any ? never : K;
    }[keyof T];

    type DataPropertiesOnly<T> = {
        [P in DataPropertyNames<T>]: T[P] extends object ? DataPropertiesOnly<T[P]> : T[P]
    };

    function NewObject(Cls: Class, Outer?: Object, Name?:string, ObjectFlags?: number): Object;
    
    type TWeakObjectPtr<T> = {
        [K in keyof T]: T[K];
    }

    type TSoftObjectPtr<T> = {
        [K in keyof T]: T[K];
    }

    type TLazyObjectPtr<T> = {
        [K in keyof T]: T[K];
    }

    class UInt64Ptr { }

    class FloatPtr { }

    class DoublePtr { }

    class Int64Ptr { }

    class UInt32Ptr { }

    class Int32Ptr { }

    class CharPtr { }

    class ShortPtr { }

    class BoolPtr { }

    class StringPtr { }

}
